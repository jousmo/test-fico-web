import moment from "moment"

export const getColor = filterSchedule => {
  let color = null
  let counter = 0

  for (const item of filterSchedule) {
    const dateOne = item.scheduledAt?.split("T")[0]
    const dateTwo = item.completedAt?.split("T")[0]

    if (!dateTwo) {
      counter++
      continue
    }

    if (dateOne !== dateTwo) {
      color = "orange"
      break
    }

    color = "green"
  }

  return counter === filterSchedule.length ? "red" : color
}

export const getCompliance = activity => {

  const compliance = activity?.schedules?.reduce((prev, current) => {
    const dateCompliance = current?.completedAt?.split("T")[0]
    return dateCompliance ? prev + 1 : prev + 0
  }, 0)

  return ((compliance * 100) / activity?.schedules?.length).toFixed(2)
}

export const getMonths = dates => {
  let startDate = null
  let endDate = null

  if (Array.isArray(dates)) {
    startDate = moment(dates[0])
    endDate = moment(dates[1])
  } else {
    startDate = moment(dates?.startDate)
    endDate = moment(dates?.endDate)
  }

  return Array.from(moment.range(startDate, endDate).by("month"))
    .map(r => ({ label: _.capitalize(r.format("MMM YY")), value: r.format("MMYYYY")}))
}
