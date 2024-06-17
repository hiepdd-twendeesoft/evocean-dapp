import { DateTime } from "luxon";

export function shortenAddress(fullAddress: string) {
  if (fullAddress.length >= 13) {
    return (
      fullAddress.substring(0, 5) +
      "..." +
      fullAddress.substring(fullAddress.length - 5)
    );
  } else {
    return fullAddress;
  }
}

export function parseDate(date: string) {
  return DateTime.fromISO(date).toFormat("dd MMM yyyy");
}
