import { Timestamp } from 'firebase/firestore';

export function getLastThreeDaysDate() {
  const now = new Date();

  const lastThreeDaysDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 3
  );

  return Timestamp.fromDate(lastThreeDaysDate);
}
