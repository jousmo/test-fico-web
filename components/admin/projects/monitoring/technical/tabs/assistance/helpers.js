import moment from "moment"

const addColumn = (activity, result, assistanceAt) => {
  if (!result[activity.id]) {
    result[activity.id] = { columns: new Set(), participants: {}, name: activity.title }
  }
  result[activity.id].columns.add(moment(assistanceAt).format("MM/DD/YYYY HH:mm"))
}

const addParticipant = (activity, assistanceAt, assistantId, fullName, result) => {
  if (!result[activity].participants[assistantId]) {
    result[activity].participants[assistantId] = { assistantId, fullName, dates: [] }
  }
  result[activity].participants[assistantId].dates.push(moment(assistanceAt).format("MM/DD/YYYY HH:mm"))
}

const getFullName = ({ lastName, name, maidenName }) => `${name} ${lastName} ${maidenName}`

export const assistanceDecorator = (assistants, dateFilter) => {
  const result = {}
  assistants.forEach(participant => {
    const fullName = getFullName(participant)
    participant.assistance.forEach(({ assistanceAt, activity }) => {
      if (dateFilter?.length > 0) {
        const isBetween = moment(assistanceAt).isBetween(dateFilter[0], dateFilter[1])
        if (!isBetween) return
      }
      addColumn(activity, result, assistanceAt)
      addParticipant(activity.id, assistanceAt, participant.id, fullName, result)
    })
  })

  return result
}

export const getRows = (participants, search) => {
  if (!search || search === "") {
    return participants
  }
  return participants.filter(el => el.fullName.toUpperCase().includes(search.toUpperCase()))
}
