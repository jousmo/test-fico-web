import { extendMoment } from "moment-range"
import Moment from "moment"
import { cloneDeep, uniq } from "lodash"
import { genderTypes } from "../selectOptions/implementer/submission"
const moment = extendMoment(Moment)
moment.locale("es")

const translateGender = gender => genderTypes.find(el => el.value === gender)

const ageByBirthdate = date => {
  const age = moment().diff(date, 'years', true)
  return Math.floor(age)
}

const translateDate = (date, format, currentFormat = "YYYY/MM/DD") => {
  if (!date) return ""
  return moment(date, currentFormat).format(format)
}

const totalActivities = assistance => {
  return uniq(assistance?.map(el => el?.activity)).length
}

const decoratedData = assistants => {
  const elements = cloneDeep(assistants)
  return elements?.map(el => {
    el.age = ageByBirthdate(el?.birthdate)
    el.activities = `+${totalActivities(el?.assistance)}`
    el.times = 5
    return el
  })
}

module.exports = {
  decoratedData,
  translateGender,
  translateDate
}
