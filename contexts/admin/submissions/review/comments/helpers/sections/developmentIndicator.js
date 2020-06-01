export const deleteDevelopmentIComments = (submission, toDelete, index) => {
  const indicators = [...submission?.developmentObjectiveIndicators]
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

export const addDevelopmentIComment = (submission, comment, index) => {
  const indicators = [...submission?.developmentObjectiveIndicators]
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
