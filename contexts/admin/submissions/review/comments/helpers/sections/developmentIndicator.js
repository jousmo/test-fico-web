export const deleteDevelopmentIComments = (submission, toDelete, index) => {
  const indicators = [...submission?.developmentObjectiveIndicators]
  const indicator = indicators[index]
  const newComments = indicator?.comments?.filter((e, i) =>
    i !== toDelete
  )
  indicators[index] = {
    ...indicator,
    comments: newComments
  }
  return indicators
}
