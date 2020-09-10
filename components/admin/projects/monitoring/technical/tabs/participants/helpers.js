import moment from "moment"

export const getStatistics = values => {
  const { beneficiaries, participants, total } = values
  return [
    { title: "Asistentes", value: participants },
    { title: "Beneficiarios", value: beneficiaries },
    { title: "Participantes totales", value: total }
  ]
}

export const decoratedData = (data, dateFilter) => {
  const { Submission: { technicalMonitoringReports } } = data
  const result = {
    beneficiaries: {
      PRIMARY: {},
      SECONDARY: {},
      TERTIARY: {}
    },
    participants: {
      PRIMARY: {},
      SECONDARY: {},
      TERTIARY: {}
    },
    summary: {
      beneficiaries: 0,
      participants: 0,
      total: 0
    }
  }

  let reports = technicalMonitoringReports
  if (dateFilter?.length > 0){
    reports = reports?.filter(report => moment(report.appliedAt).isBetween(dateFilter[0], dateFilter[1]))
  }

  reports?.forEach(({ key, participants }) => {
    participants.forEach(p => {
      const { age, amount, preventionLevel } = p
      if (p.type === "BENEFICIARY"){
        if(!result.beneficiaries[preventionLevel][age]){
          result.beneficiaries[preventionLevel][age] = []
        }

        result.summary.beneficiaries +=amount
        result.beneficiaries[preventionLevel][age].push({key, ...p})
      } else {
        if(!result.participants[preventionLevel][age]){
          result.participants[preventionLevel][age] = []
        }

        result.summary.participants +=amount
        result.participants[preventionLevel][age].push({key, ...p})
      }
      result.summary.total +=amount
    })
  })
  return result
}
