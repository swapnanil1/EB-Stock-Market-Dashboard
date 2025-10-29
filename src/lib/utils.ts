// we are writing a utility function `cn` that accepts multiple tailwind css classes.
// and then it returns a clean ,no conficts, correct class as a whole.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
