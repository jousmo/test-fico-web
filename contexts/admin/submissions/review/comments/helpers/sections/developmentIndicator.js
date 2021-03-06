export const deleteDevelopmentIComments = (submission, toDelete, i) => {
  const indicators = [...submission?.developmentObjectiveIndicators]
  const { index, ...indicator } = indicators[i]
  const newComments = indicator?.comments?.filter(e => e.id !== toDelete.id)
  indicators[i] = {
    ...indicator,
    comments: newComments
  }
  return indicators
}

export const addDevelopmentIComment = (submission, comment, i) => {
  const indicators = [...submission?.developmentObjectiveIndicators]
  const { index, ...indicator } = indicators[i]
  const comments = indicator?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  indicators[i] = {
    ...indicator,
    comments: newComments
  }
  return indicators
}
