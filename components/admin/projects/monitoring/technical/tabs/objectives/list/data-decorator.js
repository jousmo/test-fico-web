import { Tag } from "antd"

export const decoratedData = (data) => {
  const result = []

  data?.generalObjectiveIndicators?.forEach(indicator =>
    result.push({
      level: <Tag color="error">OG</Tag>,
      ...indicator
    })
  )

  data?.developmentObjectiveIndicators?.forEach(indicator =>
    result.push({
      level: <Tag color="warning">OD</Tag>,
      ...indicator
    })
  )

  data?.specificObjectives?.forEach((obj, index) => {
    const objNumber = index + 1
    const { activities, indicators, ...objective } = obj

    result.push({
      level: <Tag color="processing">{`OE${objNumber}`}</Tag>,
      ...objective
    })

    indicators?.forEach((indicator, index) => {
      const indicatorNumber = `${objNumber}.${index + 1}`
      result.push({
        level: <Tag color="processing">{`I${indicatorNumber}`}</Tag>,
        ...indicator
      })
    })

    activities?.forEach((activity, index) => {
      const activityNumber = `${objNumber}.${index + 1}`
      result.push({
        level: <Tag color="processing">{`A${activityNumber}`}</Tag>,
        ...activity
      })
    })
  })

  return result
}
