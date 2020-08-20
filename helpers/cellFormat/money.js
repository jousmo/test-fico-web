import numeral from "numeral"

export const money = value => {
  return { children: numeral(value).format("$0,0.00") }
}
