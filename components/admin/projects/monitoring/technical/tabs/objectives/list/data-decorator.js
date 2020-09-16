import { Tag } from "antd"
import moment from "moment"

export const decoratedData = (data, dateFilter) => {
  const result = []
  const isFiltered = dateFilter?.length > 0

  let activeReports = []
  if (isFiltered){
    activeReports = data?.technicalMonitoringReports?.map(({ appliedAt, key }) => {
      const isBetween = moment(appliedAt).isBetween(dateFilter[0], dateFilter[1])
      if (isBetween){
        return key
      }
    })
  }

  const addItem = (key, item) => {
    if (isFiltered){
      if (activeReports.includes(key)){
        result.push(item)
      }
    } else {
      result.push(item)
    }
  }

  data?.generalObjectiveIndicators?.forEach((indicator, i) => {
    const key = `OG_${i + 1}`
    addItem(key, {
      key,
      level: <Tag color="error">OG</Tag>,
      ...indicator
    })
  })

  data?.developmentObjectiveIndicators?.forEach((indicator, i) => {
    const key = `OD_${i + 1}`
    addItem(key, {
      key,
      level: <Tag color="warning">OD</Tag>,
      ...indicator
    })
  })

  data?.specificObjectives?.forEach((obj, index) => {
    const objNumber = index + 1
    const { activities, indicators, ...objective } = obj

    const key = `OE_${objNumber}`
    addItem(key, {
      key,
      level: <Tag color="processing">{`OE${objNumber}`}</Tag>,
      ...objective
    })

    let accumulatedGoal = 0

    indicators?.forEach((indicator, index) => {
      const indicatorNumber = `${objNumber}.${index + 1}`
      accumulatedGoal += Number(indicator.goal)

      const key = `IE_${indicatorNumber}`
      addItem(key, {
        key,
        level: <Tag color="processing">{`I${indicatorNumber}`}</Tag>,
        ...indicator
      })
    })

    activities?.forEach((activity, index) => {
      const activityNumber = `${objNumber}.${index + 1}`
      accumulatedGoal += Number(activity.goal)

      const key = `AE_${activityNumber}`
      addItem(key, {
        key,
        level: <Tag color="processing">{`A${activityNumber}`}</Tag>,
        ...activity
      })
    })

    const objectiveIndex = result.findIndex(el => el.key === key)
    result[objectiveIndex] = {
      ...result[objectiveIndex],
      goal: accumulatedGoal
    }
  })

  const reportResult = result.map(el => {
    const report = data?.technicalMonitoringReports?.find(report => report.key === el.key)
    return {
      ...el,
      ...report,
      reportId: report?.id
    }
  })

  return reportResult
}
