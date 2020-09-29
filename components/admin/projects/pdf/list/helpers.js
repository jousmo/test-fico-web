import numeral from "numeral"
import moment from "moment"

export const money = value => {
  return numeral(value).format("$0,0.00")
}

export const getDate = value => {
  return moment(value).format("DD/MM/YYYY")
}

export const getGoalBeneficiaries = data => {
  let result = 0
  data?.beneficiaries?.forEach(({number}) =>
    result += number
  )
  return result
}
