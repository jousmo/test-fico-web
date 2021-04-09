export const getActivities = submission => {
  return submission.specificObjectives.reduce((prev, current) => {
    prev.push(...current.activities)
    return prev
  }, [])
}

export const getAssistance = (assistance, assistants) => {
  const { activities, assistanceAt } = assistance
  const result = []
  activities.forEach(activity => {
    assistants.forEach(({ id: projectAssistant }) => {
      result.push({ activity, projectAssistant, assistanceAt })
    })
  })
  return result
}
