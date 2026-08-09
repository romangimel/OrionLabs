/**
 * Calculates a person's completed years of age from an HTML date input value.
 * The optional current date keeps the calendar-boundary behavior easy to verify.
 */
export function calculateAge(birthDate: string, currentDate = new Date()): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!match || Number.isNaN(currentDate.getTime())) {
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

  let age = currentDate.getFullYear() - year;
  const birthdayHasOccurred =
    currentDate.getMonth() + 1 > month ||
    (currentDate.getMonth() + 1 === month && currentDate.getDate() >= day);

  if (!birthdayHasOccurred) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}
