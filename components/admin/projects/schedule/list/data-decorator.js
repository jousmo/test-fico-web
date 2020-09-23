import { Tag } from "antd"

export const decoratedData = (data) => {
  const result = []
  data?.Submission?.specificObjectives?.sort((a, b) => a.orderIndex - b.orderIndex)
    .forEach(objective => {
      objective.activities.sort((a, b) => a.orderIndex - b.orderIndex)
        .forEach((activity, i) => {
          const key = `A${objective.orderIndex}.${activity.orderIndex}`
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
