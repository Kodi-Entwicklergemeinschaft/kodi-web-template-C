import { DateTime } from 'luxon';

export const getFormattedDate = (date: string) => {

  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  })
};

export const getTodayStartAndEnd = () => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate,
    endDate,
  };
}


type DateRange = {
  startDate: string;
  endDate: string;
};

type CustomRange = {
  start?: string;
  end?: string;
};

export const getDateRangeFromFilter = (filter: string, customRange?: CustomRange): DateRange => {
  const now = DateTime.now().startOf('day');

  switch (filter) {
    case 'today':
      return {
        startDate: now.toJSDate().toISOString(),
        endDate: now.endOf('day').toJSDate().toISOString(),
      };

    case 'weekend': {
      const weekday = now.weekday; // 1 = Monday, ..., 7 = Sunday
      const daysUntilSaturday = (6 - weekday + 7) % 7;
      const start = now.plus({ days: daysUntilSaturday });
      const end = start.plus({ days: 1 }).endOf('day');
      return {
        startDate: start.toJSDate().toISOString(),
        endDate: end.toJSDate().toISOString(),
      };
    }

    case '7': {
      const start = now.minus({ days: 6 }); // includes today
      return {
        startDate: start.toJSDate().toISOString(),
        endDate: now.endOf('day').toJSDate().toISOString(),
      };
    }

    case '30': {
      const start = now.minus({ days: 29 });
      return {
        startDate: start.toJSDate().toISOString(),
        endDate: now.endOf('day').toJSDate().toISOString(),
      };
    }

    case 'custom': {
      if (!customRange?.start || !customRange?.end) {
        throw new Error('Custom range requires both start and end dates.');
      }
      const start = DateTime.fromISO(customRange.start).startOf('day');
      const end = DateTime.fromISO(customRange.end).endOf('day');
      return {
        startDate: start.toJSDate().toISOString(),
        endDate: end.toJSDate().toISOString(),
      };
    }

    default:
      throw new Error('Invalid date filter');
  }
}

export const getRecommendationDate = () => {
  const today = DateTime.local();
  const tenDaysLater = today.plus({ days: 9 });
  return {
    start: today.toFormat("yyyy-MM-dd"),
    end: tenDaysLater.toFormat("yyyy-MM-dd")
  }
}