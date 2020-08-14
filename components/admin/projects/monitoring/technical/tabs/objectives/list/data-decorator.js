import { Tag } from "antd"

export const decoratedData = (data) => {
  const result = []

  data?.generalObjectiveIndicators?.forEach((indicator, i) =>
    result.push({
      key: `OG_${i}`,
      level: <Tag color="error">OG</Tag>,
      ...indicator
    })
  )

  data?.developmentObjectiveIndicators?.forEach((indicator, i) =>
    result.push({
      key: `OD_${i}`,
      level: <Tag color="warning">OD</Tag>,
      ...indicator
    })
  )

  data?.specificObjectives?.forEach((obj, index) => {
    const objNumber = index + 1
    const { activities, indicators, ...objective } = obj

    result.push({
      key: `OE_${index}`,
      level: <Tag color="processing">{`OE${objNumber}`}</Tag>,
      ...objective
    })

    indicators?.forEach((indicator, index) => {
      const indicatorNumber = `${objNumber}.${index + 1}`
      result.push({
        key: `IE_${indicatorNumber}`,
        level: <Tag color="processing">{`I${indicatorNumber}`}</Tag>,
        ...indicator
      })
    })

    activities?.forEach((activity, index) => {
      const activityNumber = `${objNumber}.${index + 1}`
      result.push({
        key: `AE_${activityNumber}`,
        level: <Tag color="processing">{`A${activityNumber}`}</Tag>,
        ...activity
      })
    })
  })

  return result
}
