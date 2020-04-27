import { getReadableValue } from "../selectOptions"

/* eslint:disable */
export const options = (types) => (value) => {
  return { children: getReadableValue(types, value) }
}
