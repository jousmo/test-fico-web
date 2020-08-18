export const decoratedGoal = data => {
  let goal = 0

  const getNumber = value => {
    const number = +value
    if (isNaN(number)){
      return 0
    }
    return number
  }

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
  return goal
}

export const decoratedReal = data => {
  const { technicalMonitoringReports: reports } = data || {}
  return reports?.reduce((acc, item) => (
    acc += Number(item.completed || 0)
  ), 0) || 0
}

export const decoratedFulfilled = (real, goal) => {
  const currentGoal = goal === 0 ? 1 : goal
  const result = ((real * 100) / currentGoal).toString()
  return `${result.substring(0,4)}%`
}
