import { Paper, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
interface CardProps {
  title: string;
  description?: string;
  LeftIcon?: React.ElementType;
  IconUrl?: string;
  RightIcon?: React.ElementType;
  href?: string;
}

const VTHCard: React.FC<CardProps> = ({ title, description, LeftIcon, RightIcon, IconUrl, href }) => {
  const navigate = useNavigate();
  return (
    <Link href={href} underline="none" sx={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          bgcolor: (theme) => theme.palette.common.white,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 6,
            cursor: 'pointer',
          },
        }}
      >
        {(LeftIcon) ? <Box sx={{ flexGrow: 1, display: 'flex', mr: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
          <LeftIcon fontSize="large" />
        </Box> :
          <Box sx={{ flexGrow: 1, display: 'flex', mr: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Box sx={{ backgroundImage: `url(${IconUrl})`, backgroundSize: 'cover', width: '40px', height: '40px' }}></Box>
          </Box>
        }
        <Box sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography fontWeight={600} color="#18204F">{title}</Typography>
          {(description) && <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>}
        </Box>
        {(RightIcon) && <Box sx={{ flexGrow: 1, display: 'flex', mr: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          <RightIcon sx={{width: '30px', height: '30px', color:"#18204f"}}/>
        </Box>}
      </Paper>
    </Link>
  );
}

export default VTHCard;