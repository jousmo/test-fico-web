import numeral from "numeral"

export const percentage = (value) => {
  return { children: `${numeral(value).format("0,0.00")}%` }
}
