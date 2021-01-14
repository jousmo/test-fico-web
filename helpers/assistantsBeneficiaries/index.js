import { extendMoment } from "moment-range"
import Moment from "moment"
import { cloneDeep, uniq } from "lodash"
import {
  genderTypes,
  issueTypes,
  strategicAxisTypes
} from "../selectOptions/implementer/submission"
const moment = extendMoment(Moment)
moment.locale("es")

const translateGender = gender => genderTypes.find(el => el.value === gender)
const translateIssueTypes = type => issueTypes.find(el => el.value === type)
const translateStrategicAxisTypes = type => strategicAxisTypes.find(el => el.value === type)

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

const decoratedData = (assistants, dateFilter) => {
  let elements = cloneDeep(assistants)

  if (dateFilter?.length > 0) {
    elements = elements.filter(el => moment(el.birthdate).isBetween(dateFilter[0], dateFilter[1]))
  }

  return elements?.map(el => {
    el.age = ageByBirthdate(el?.birthdate)
    el.activities = `+${totalActivities(el?.assistance)}`
    el.times = 5
    return el
  })
}

const totAct = submissions => {
  let activities = 0
  let issueDescription = []

  for (const submission of submissions) {
    issueDescription.push(submission?.issueDescription)
    for (const specificObjective of submission?.specificObjectives) {
      activities += specificObjective.activities.length
    }
  }
  return { issueDescription, activities }
}

const decoratedCensusData = (census, dateFilter) => {
  let elements = cloneDeep(census)

  if (dateFilter?.length > 0) {
    elements = elements.filter(el => moment(el.birthdate).isBetween(dateFilter[0], dateFilter[1]))
  }

  return elements?.map(el => {
    const { issueDescription, activities } = totAct(el?.submission)
    const problematic = translateIssueTypes(issueDescription[0]).label
    el.age = ageByBirthdate(el?.birthdate)
    el.activities = `+${activities}`
    el.projects = `+${el?.submission?.length}`
    el.problematic = problematic
    el.axis = `+${el?.submission?.length}`
    return el
  })
}

const decoratedCensusBeneficiary = submission => {
  const elements = cloneDeep(submission)
  return elements?.map(el => {
    for (const objective of el?.specificObjectives) {
      return {
        name: objective?.description,
        date: translateDate(objective?.createdAt, "DD/MM/YYYY"),
        strategicAxis: translateStrategicAxisTypes(el?.strategicAxis).label,
        issueDescription: translateIssueTypes(el?.issueDescription).label
      }
    }
  })
}

module.exports = {
  decoratedCensusBeneficiary,
  decoratedCensusData,
  decoratedData,
  translateGender,
  translateDate
}
