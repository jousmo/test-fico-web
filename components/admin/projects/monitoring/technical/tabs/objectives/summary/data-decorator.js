export const decoratedGoal = data => {
  let goal = 0
  data?.generalObjectiveIndicators?.forEach(indicator =>
    goal += parseInt(indicator.goal)
  )

  data?.developmentObjectiveIndicators?.forEach(indicator =>
    goal += parseInt(indicator.goal)
  )

  data?.specificObjectives?.forEach(objective => {
    const { indicators, activities } = objective
    indicators?.forEach(indicator => {
      if (typeof (indicator.goal) !== "number"){
        return
      }
      goal += parseInt(indicator.goal)
    })
    activities?.forEach(activity => {
      if (typeof (activity.goal) !== "number"){
        return
      }
      goal += parseInt(activity.goal)
    })
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
