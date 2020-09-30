import numeral from "numeral"

export const money = value => {
  return numeral(value).format("$0,0.00")
}
