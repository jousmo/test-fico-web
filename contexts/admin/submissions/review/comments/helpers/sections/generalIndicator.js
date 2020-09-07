export const deleteGeneralIComments = (submission, toDelete, i) => {
  const indicators = [...submission?.generalObjectiveIndicators]
  const { index, ...indicator } = indicators[i]
  const newComments = indicator?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  indicators[i] = {
    ...indicator,
    comments: newComments
  }
  return indicators
}

export const addGeneralIComment = (submission, comment, i) => {
  const indicators = [...submission?.generalObjectiveIndicators]
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
