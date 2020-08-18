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
    beneficiaries: {},
    participants: {}
  }

  reports?.forEach(({ key, participants }) => {
    participants.forEach(p => {
      const { age } = p
      if (p.type === "BENEFICIARY"){
        if(!result.beneficiaries[age]){
          result.beneficiaries[age] = []
        }

        result.beneficiaries[age].push({key, ...p})
      } else {
        if(!result.participants[age]){
          result.participants[age] = []
        }

        result.participants[age].push({key, ...p})
      }
    })
  })
  return result
}
