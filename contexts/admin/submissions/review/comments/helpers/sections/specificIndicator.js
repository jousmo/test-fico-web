export const deleteSpecificIComments = (submission, toDelete, i) => {
  const indices = i.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  delete objective.index
  const indicators = objective?.indicators
  const indicator = indicators[indices[1]]
  delete indicator.index

  const newComments = indicator?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  indicators[indices[1]] = {
    ...indicator,
    comments: newComments
  }
  objectives[indices[0]] = {
    ...objective,
    indicators: indicators
  }
  return {
    objectives,
    newComments,
  }
}

export const addSpecificIComment = (submission, comment, i) => {
  const indices = i.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  delete objective.index
  const indicators = objective?.indicators
  const indicator = indicators[indices[1]]
  delete indicator.index
  const comments = indicator?.comments || []

  indicators[indices[1]] = {
    ...indicator,
    comments: [
      ...comments,
      comment
    ]
  }

  objectives[indices[0]] = {
    ...objective,
    indicators: indicators
  }
  return objectives
}
