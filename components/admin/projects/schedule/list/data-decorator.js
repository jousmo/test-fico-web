import { Tag } from "antd"

export const decoratedData = (data) => {
  const result = []
  data?.Submission?.specificObjectives?.forEach((objective, index) => {
    const objNumber = index + 1

    objective.indicators.forEach((indicator, i) => {
      const key = `I${objNumber}.${i + 1}`
      result.push({
        description: indicator.description,
        key,
        level: <Tag color="processing">{key}</Tag>,
        ...indicator
      })
    })

    objective.activities.forEach((activity, i) => {
      const key = `A${objNumber}.${i + 1}`
      result.push({
        description: activity.description,
        key,
        level: <Tag color="processing">{key}</Tag>,
        ...activity
      })
    })
  })
  return result
}
