export const getStatistics = () => {
  return [
    { title: "Asistentes", value: 90 },
    { title: "Beneficiarios", value: 45 },
    { title: "Participantes totales", value: 135 }
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
    }
  }

  reports?.forEach(({ key, participants }) => {
    participants.forEach(p => {
      const { age, preventionLevel } = p
      if (p.type === "BENEFICIARY"){
        if(!result.beneficiaries[preventionLevel][age]){
          result.beneficiaries[preventionLevel][age] = []
        }

        result.beneficiaries[preventionLevel][age].push({key, ...p})
      } else {
        if(!result.participants[preventionLevel][age]){
          result.participants[preventionLevel][age] = []
        }

        result.participants[preventionLevel][age].push({key, ...p})
      }
    })
  })
  return result
}
