import numeral from "numeral"
import moment from "moment"

export const money = value => {
  return numeral(value).format("$0,0.00")
}

export const getDate = value => {
  return moment(value).format("DD MMMM YYYY").toUpperCase()
}
