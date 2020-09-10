import moment from "moment"

export const getReport = (data, row) => {
  if (row.key.includes("OE")) {
    const result = {
      completed: 0,
      compliance: 0,
      participants: []
    }

    data?.technicalMonitoringReports?.forEach(report => {
      if (report.key.includes(`E_${row.key.split("_")[1]}`)){
        result.completed += Number(report.completed)
        result.participants.push(...report.participants)
      }
    })
    result.compliance = ((result.completed * 100) / row.goal).toFixed(2)

    return result
  } else {
    return data?.technicalMonitoringReports?.find(r => r.key === row.key)
  }
}

export const getParticipants = (data, row) => {
  const report = getReport(data, row)
  return report?.participants?.reduce((acc, item) => (
    acc += Number(item.amount || 0)
  ), 0) || 0
}

export const getAppliedAt = (data, row) => {
  const { appliedAt } = getReport(data, row) || {}
  if (!appliedAt){
    return null
  }

  return moment(appliedAt).format("DD/MM/YYYY")
}

export const onSearch = (data, value, setState) => {
  if (!value) {
    setState(false)
    return
  }

  const loweredValue = value.toLowerCase()
  const filter = data?.filter(el =>
    el.description?.toLowerCase().includes(loweredValue) ||
    el.title?.toLowerCase().includes(loweredValue) ||
    el.meansOfVerification?.toLowerCase().includes(loweredValue)
  )
  setState(filter)
}
