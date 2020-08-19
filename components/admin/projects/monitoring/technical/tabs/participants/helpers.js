export const getStatistics = values => {
  const { beneficiaries, participants, total }= values
  return [
    { title: "Asistentes", value: participants },
    { title: "Beneficiarios", value: beneficiaries },
    { title: "Participantes totales", value: total }
  ]
}

export const decoratedData = data => {
  const { Submission: { technicalMonitoringReports: reports } } = data
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
