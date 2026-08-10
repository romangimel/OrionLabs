interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

/** Parses an HTML date input value without allowing JavaScript date rollover. */
function parseDateInput(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
}

/** Returns whether a value is a real calendar date in HTML input format. */
export function isValidBirthDate(birthDate: string): boolean {
  return parseDateInput(birthDate) !== null;
}

/**
 * Compares a valid birth date with the user's current local calendar date.
 * Invalid values return false because callers should validate the date first.
 */
export function isBirthDateInFuture(
  birthDate: string,
  currentDate = new Date(),
): boolean {
  const parsedBirthDate = parseDateInput(birthDate);
  if (!parsedBirthDate || Number.isNaN(currentDate.getTime())) {
    return false;
  }

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  return (
    parsedBirthDate.year > currentYear ||
    (parsedBirthDate.year === currentYear && parsedBirthDate.month > currentMonth) ||
    (parsedBirthDate.year === currentYear &&
      parsedBirthDate.month === currentMonth &&
      parsedBirthDate.day > currentDay)
  );
}

/**
 * Calculates a person's completed years of age from an HTML date input value.
 * The optional current date keeps the calendar-boundary behavior easy to verify.
 */
export function calculateAge(birthDate: string, currentDate = new Date()): number | null {
  const parsedBirthDate = parseDateInput(birthDate);
  if (!parsedBirthDate || Number.isNaN(currentDate.getTime())) {
    return null;
  }

  let age = currentDate.getFullYear() - parsedBirthDate.year;
  const birthdayHasOccurred =
    currentDate.getMonth() + 1 > parsedBirthDate.month ||
    (currentDate.getMonth() + 1 === parsedBirthDate.month &&
      currentDate.getDate() >= parsedBirthDate.day);

  if (!birthdayHasOccurred) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}
