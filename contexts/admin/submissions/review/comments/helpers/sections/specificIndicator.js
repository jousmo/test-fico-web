export const deleteSpecificIComments = (submission, toDelete, index) => {
  const indices = index.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  const indicators = objective?.indicators
  const indicator = indicators[indices[1]]

  const newComments = indicator?.comments?.filter((e, i) =>
    i !== toDelete
  )
  indicators[indices[1]] = {
    ...indicator,
    comments: newComments
  }
  objectives[indices[0]] = {
    ...objective,
    indicators: indicators
  }
  return objectives
}
