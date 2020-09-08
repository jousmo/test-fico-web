import moment from "moment"

export const getReport = (data, row) => {
  return data?.technicalMonitoringReports?.find(r => r.key === row.key)
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
