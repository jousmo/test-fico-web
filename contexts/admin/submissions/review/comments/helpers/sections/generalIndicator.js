export const deleteGeneralIComments = (submission, toDelete, index) => {
  const indicators = [...submission?.generalObjectiveIndicators]
  const indicator = indicators[index]
  const newComments = indicator?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  indicators[index] = {
    ...indicator,
    comments: newComments
  }
  return indicators
}

export const addGeneralIComment = (submission, comment, index) => {
  const indicators = [...submission?.generalObjectiveIndicators]
  const indicator = indicators[index]
  const comments = indicator?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  indicators[index] = {
    ...indicator,
    comments: newComments
  }
  return indicators
}