import { phoneE164, email } from "@util/regex"

export const isValid = (regex: RegExp, str: string) => regex.test(str)
export const validPhone = (str: string) => isValid(phoneE164, str)
export const validEmail = (str: string) => isValid(email, str)