import { isLeapYear } from './leapYear';

export interface CalculateDateResponse {
  twelveDivision: number;
  twelveRest: number;
  twelveRestFourDivision: number;
  centuryAnchorDate: number;
  doomsdaySum: number;
  doomsday: number;
  closestDoomsdayDate: string;
  doomsdaysSteps: string[];
}

// Lazy list of doomsadays that I have memorized
const KNOWN_DOOMSDAYS: { date: string; onlyLeapYear?: boolean; onlyNotLeapYear?: boolean }[] = [
  {
    date: '01-03',
    onlyNotLeapYear: true,
  },
  {
    date: '01-04',
    onlyLeapYear: true,
  },
  {
    date: '02-28',
    onlyNotLeapYear: true,
  },
  {
    date: '02-29',
    onlyLeapYear: true,
  },
  {
    date: '03-14',
  },
  {
    date: '04-04',
  },
  {
    date: '05-09',
  },
  {
    date: '05-30',
  },
  {
    date: '06-06',
  },
  {
    date: '06-20',
  },
  {
    date: '07-11',
  },
  {
    date: '08-08',
  },
  {
    date: '08-15',
  },
  {
    date: '09-05',
  },
  {
    date: '10-10',
  },
  {
    date: '11-07',
  },
  {
    date: '12-12',
  },
];

const addZeroPadding = (value: number): string => {
  if (value < 10) {
    return `0${value}`;
  }

  return value.toString();
};

const calculateModuloValues = (
  date: Date,
): {
  twelveDivision: number;
  twelveRest: number;
  twelveRestFourDivision: number;
} => {
  const yearLastTwoDigits = parseInt(date.getFullYear().toString().slice(2));

  const twelveDivision = Math.floor(yearLastTwoDigits / 12);
  const twelveRest = yearLastTwoDigits % 12;
  const twelveRestFourDivision = Math.floor(twelveRest / 4);

  return {
    twelveDivision,
    twelveRest,
    twelveRestFourDivision,
  };
};

const getCenturyAnchorDate = (date: Date): number => {
  const yearFirstTwoDigits = parseInt(date.getFullYear().toString().slice(0, 2));

  // I guess I could script this, but I am lazy
  switch (yearFirstTwoDigits) {
    case 17:
      return 0; // Sunday
    case 18:
      return 5; // Friday
    case 19:
      return 3; // Wednesday
    case 20:
      return 2; // Tuesday
    case 21:
      return 0; // Sunday
    default:
      throw new Error('No anchor date for century');
  }
};

const findClosestDoomsdayDate = (dateObj: Date): string => {
  const leapYear = isLeapYear(dateObj.getFullYear());
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  const filteredKnownDoomsdays = KNOWN_DOOMSDAYS.filter((obj) => {
    if (!obj.onlyLeapYear && !obj.onlyNotLeapYear) {
      return true;
    }

    if (leapYear && obj.onlyLeapYear) {
      return true;
    }

    return !leapYear && obj.onlyNotLeapYear;
  });

  const knownDoomsdaysInSameMonth = filteredKnownDoomsdays.filter((obj) => {
    const [knownDoomsdayMonth, _] = obj.date.split('-').map((value) => parseInt(value));

    return knownDoomsdayMonth === month;
  });

  if (knownDoomsdaysInSameMonth.length === 1) {
    return knownDoomsdaysInSameMonth[0].date;
  }

  let closestKnownDoomsday: null | string = null;
  let closestKnownDoomsdayDistance: null | number = null;

  for (const knownDoomsdayInSameMonth of knownDoomsdaysInSameMonth) {
    const [_, knownDoomsdayDate] = knownDoomsdayInSameMonth.date.split('-').map((value) => parseInt(value));
    const distance = Math.abs(date - knownDoomsdayDate);
    if (closestKnownDoomsday === null) {
      closestKnownDoomsday = knownDoomsdayInSameMonth.date;
      closestKnownDoomsdayDistance = distance;
      continue;
    }

    if (closestKnownDoomsdayDistance !== null && distance > closestKnownDoomsdayDistance) {
      continue;
    }

    closestKnownDoomsday = knownDoomsdayInSameMonth.date;
    closestKnownDoomsdayDistance = distance;
  }

  return closestKnownDoomsday as string;
};

const createDoomsdaySteps = (dateObj: Date, closestDoomsdayDate: string): string[] => {
  const steps: string[] = [closestDoomsdayDate];
  const monthPrefix = closestDoomsdayDate.split('-')[0];

  const date = dateObj.getDate();
  const closestDoomsdayInitialDate = parseInt(steps[steps.length - 1].split('-')[1]);
  if (Math.abs(closestDoomsdayInitialDate - dateObj.getDate()) < 7) {
    return steps;
  }

  while (true) {
    const currentClosestDate = parseInt(steps[steps.length - 1].split('-')[1]);

    const moveOneWeek = currentClosestDate < date ? currentClosestDate + 7 : currentClosestDate - 7;
    steps.push(`${monthPrefix}-${addZeroPadding(moveOneWeek)}`);

    if (Math.abs(moveOneWeek - dateObj.getDate()) < 7) {
      break;
    }
  }

  return steps;
};

export const calculateDate = (date: Date): CalculateDateResponse => {
  const { twelveDivision, twelveRest, twelveRestFourDivision } = calculateModuloValues(date);
  const centuryAnchorDate = getCenturyAnchorDate(date);

  const doomsdaySum = twelveDivision + twelveRest + twelveRestFourDivision + centuryAnchorDate;
  const doomsday = doomsdaySum % 7;

  const closestDoomsdayDate = findClosestDoomsdayDate(date);
  const doomsdaysSteps = createDoomsdaySteps(date, closestDoomsdayDate);

  return {
    twelveDivision,
    twelveRest,
    twelveRestFourDivision,
    centuryAnchorDate,
    doomsdaySum,
    doomsday,
    closestDoomsdayDate,
    doomsdaysSteps,
  };
};
