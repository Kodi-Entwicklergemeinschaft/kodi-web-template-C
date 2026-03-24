import { useEffect, useState } from "react";
import {
    Box,
    Typography,
} from "@mui/material";
import axios from "axios";
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, YAxis, Area, LabelList } from "recharts";
import cloudy from "../../assets/clody_partly_cloud-Photoroom.png";
import rainy from "../../assets/rainy_thenderstorm-Photoroom.png";
import snow from "../../assets/snow_sleet-Photoroom.png";
import sunny from "../../assets/sunny_clear-Photoroom.png";
import { IForecastday, IWeather } from "../../types/weather";
import { useTranslation } from "react-i18next";
import DataLoaderWrapper from "../../components/loader/DataLoaderWrapper";

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdays1 = ['weekdays.0', 'weekdays.1', 'weekdays.2', 'weekdays.3', 'weekdays.4', 'weekdays.5', 'weekdays.6']

function getNextDatesWithWeekday() {
    const dates = [];
    const today = new Date();
    for (let i = 3; i < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);

        const yyyy = nextDate.getFullYear();
        const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
        const dd = String(nextDate.getDate()).padStart(2, '0');
        const day = weekdays[nextDate.getDay()];

        dates.push({
            date: `${yyyy}-${mm}-${dd}`,
            day: day,
        });
    }

    return dates;
}

const getWeatherImageAsset = (weatherCode: number) => {
    if (weatherCode == 1000) {
        return sunny;
    } else if ([1003, 1006, 1009, 1030, 1135, 1147].includes(weatherCode)) {
        return cloudy;
    } else if ([
        1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1201,
        1240, 1243, 1246, 1273, 1276
    ].includes(weatherCode)) {
        return rainy;
    } else if ([
        1066, 1069, 1072, 1114, 1117, 1168, 1171, 1204, 1207, 1210, 1213, 1216, 1219,
        1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282
    ].includes(weatherCode)) {
        return snow;
    } else {
        return cloudy;
    }
};

const WeatherCard = () => {
    const [weather, setWeather] = useState<IWeather | null>(null);
    const [weeklyData, setWeeklyData] = useState<Record<string, string | number>[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchWeather = async () => {
            const dates = getNextDatesWithWeekday();
            const responses: IForecastday[] = [];
            try {
                const currentDaysData = await axios.get(
                    `${import.meta.env.VITE_API_URL}thirdParty/weather`,
                    {
                        params: {
                            location: "Kusel",
                            days: 3,
                        },
                    }
                );
                responses.push(...currentDaysData.data.forecast.forecastday);
                for (let i = 0; i < dates.length; i++) {
                    const response1 = await axios.get(
                        `${import.meta.env.VITE_API_URL}thirdParty/weather`,
                        {
                            params: {
                                location: "Kusel",
                                dt: dates[i].date,
                            },
                        }
                    );
                    responses.push(...response1.data.forecast.forecastday);
                }
                const weeklyData = responses.map((dayData: IForecastday) => ({
                    temp_c: dayData.day.maxtemp_c,
                    icon: dayData.day.condition.icon,
                    code: dayData.day.condition.code,
                    day: new Date(dayData.date).getDay(),
                    hours: dayData.hour
                }));
                setWeeklyData(weeklyData);
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    return (
        <DataLoaderWrapper isLoading={loading} height={350}>
            <Box
                sx={{
                    borderRadius: 4,
                    background: 'transparent',
                    boxShadow: 0,
                    px: 6,
                    pb: 6,
                    pt: 0,
                    translate: 'none',
                    width: "100%"
                }}
            >
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                    <Box display="flex" flexDirection={{ xs: 'column', sm:'row', md: 'column' }} justifyContent="space-between" gap={4} sx={{
                        alignItems: { xs: 'center', md: 'flex-start' }, '@media (max-width:365px)': {
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        },
                    }}>
                        <Box>
                            <Typography variant="h2" fontWeight="bold">
                                {weeklyData[selectedDay]?.temp_c}°C
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Kusel
                            </Typography>
                        </Box>
                        <Box
                            component="img"
                            src={getWeatherImageAsset(weeklyData[selectedDay]?.code as number)}
                            sx={{
                                width: { xs: "120px", md: "200px" },
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />

                    </Box>
                    <Box alignSelf={{ xs: "center", md: "flex-end" }} sx={{ width: { xs: "100%", md: "80%" } }}>
                        <Box style={{ overflowX: "auto", width: "100%", overflowY: 'hidden' }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart
                                    data={weeklyData[selectedDay]?.hours?.filter((_: any, index: number) => index % 4 === 0)?.map((h: any) => ({
                                        time: h.time?.split(" ")[1],
                                        temp: h.temp_c,
                                    }))}
                                    margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                                >
                                    <XAxis dataKey="time" fontSize={14} axisLine={false} tickLine={false} />
                                    <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                                    <Tooltip formatter={(value: number) => `${value}°C`} />
                                    <Area
                                        type="monotone"
                                        dataKey="temp"
                                        stroke="#A2D729"
                                        fill="#A2D72933"
                                        strokeWidth={2}
                                        dot={{ r: 2 }}
                                    >
                                        <LabelList dataKey="temp" position="top" formatter={(value: number) => `${value}`} />
                                    </Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                        <Box
                            sx={{
                                px: 2,
                                mt: 4,
                                overflowX: { xs: "auto", md: "visible" },
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    justifyContent: {
                                        xs: "flex-start",
                                        md: "space-between",
                                    },
                                    width: {
                                        xs: "max-content",
                                        md: "100%",
                                    },
                                    overflowX: "auto",
                                    scrollbarWidth: "none",
                                    "&::-webkit-scrollbar": {
                                        display: "none",
                                    },
                                }}
                            >
                                {weeklyData.map(({ temp_c, icon, day }, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedDay(index)}
                                        sx={{
                                            textAlign: "center",
                                            border: selectedDay === index ? "1px solid #A2D729" : "none",
                                            borderRadius: "12px",
                                            py: "8px",
                                            px: 3,
                                            minWidth: 60,
                                            flexShrink: 0,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                                            {t(weekdays1?.[day as number])?.substring(0, 2)}
                                        </Typography>
                                        <img src={icon as string} alt={day as string} width={24} height={24} />
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{temp_c}°</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </DataLoaderWrapper>
    );
};

export default WeatherCard;
