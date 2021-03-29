const addColumn = (activity, result, assistanceAt) => {
  if (!result[activity.id]) {
    result[activity.id] = { columns: new Set(), participants: {}, name: activity.title }
  }
  result[activity.id].columns.add(assistanceAt)
}

const addParticipant = (activity, assistanceAt, assistantId, fullName, result) => {
  if (!result[activity].participants[assistantId]) {
    result[activity].participants[assistantId] = { assistantId, fullName, dates: [] }
  }
  result[activity].participants[assistantId].dates.push(assistanceAt)
}

const getFullName = ({ lastName, name, maidenName }) => `${name} ${lastName} ${maidenName}`

export const assistanceDecorator = assistants => {
  const result = {}
  assistants.forEach(participant => {
    const fullName = getFullName(participant)
    participant.assistance.forEach(({ assistanceAt, activity }) => {
      addColumn(activity, result, assistanceAt)
      addParticipant(activity.id, assistanceAt, participant.id, fullName, result)
    })
  })

  return result
}

export const onSearch = (assistance, setAssistants, value) => {

}
