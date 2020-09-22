import { Tag } from "antd"

export const decoratedData = (data) => {
  const result = []
  data?.Submission?.specificObjectives?.sort((a, b) => a.orderIndex - b.orderIndex)
    .forEach(objective => {
      objective.activities.forEach((activity, i) => {
        const key = `A${objective.orderIndex}.${i + 1}`
        result.push({
          description: activity.description,
          key,
          level: <Tag color="processing">{key}</Tag>,
          objective: objective.id,
          ...activity
        })
      })
  })
  return result
}
