import moment from "moment"

export const decoratedGoal = (data, dateFilter) => {
  let goal = 0

  const getNumber = value => {
    const number = +value
    if (isNaN(number)){
      return 0
    }
    return number
  }

  if (dateFilter?.length > 0) {
    data?.technicalMonitoringReports.forEach(report => {
      if(moment(report.appliedAt).isBetween(dateFilter[0], dateFilter[1])){
        goal += report.goal
      }
    })
  } else {
    data?.generalObjectiveIndicators?.forEach(indicator =>
      goal += getNumber(indicator.goal)
    )

    data?.developmentObjectiveIndicators?.forEach(indicator =>
      goal += getNumber(indicator.goal)
    )

    data?.specificObjectives?.forEach(objective => {
      const { indicators, activities } = objective
      indicators?.forEach(indicator =>
        goal += getNumber(indicator.goal)
      )
      activities?.forEach(activity =>
        goal += getNumber(activity.goal)
      )
    })
  }

  return goal
}

export const decoratedReal = (data, dateFilter) => {
  const { technicalMonitoringReports } = data || {}

  let reports = technicalMonitoringReports
  if (dateFilter?.length > 0){
    reports = reports?.filter(report => moment(report.appliedAt).isBetween(dateFilter[0], dateFilter[1]))
  }

  return reports?.reduce((acc, item) => (
    acc += Number(item.completed || 0)
  ), 0) || 0
}

export const decoratedFulfilled = (real, goal) => {
  const currentGoal = goal === 0 ? 1 : goal
  const result = ((real * 100) / currentGoal).toString()
  return `${result.substring(0,4)}%`
}
