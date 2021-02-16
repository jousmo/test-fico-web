export const deleteSpecificOComments = (submission, toDelete, i) => {
  const objectives = [...submission?.specificObjectives]
  const { index, ...objective } = objectives[i]
  const newComments = objective?.comments?.filter(e => e.id !== toDelete.id)
  objectives[i] = {
    ...objective,
    comments: newComments
  }
  return objectives
}

export const addSpecificOComment = (submission, comment, i) => {
  const objectives = [...submission?.specificObjectives]
  const { index, ...objective } = objectives[i]
  const comments = objective?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  objectives[i] = {
    ...objective,
    comments: newComments
  }
  return objectives
}
