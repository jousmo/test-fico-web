export const deleteSpecificOComments = (submission, toDelete, index) => {
  const objectives = [...submission?.specificObjectives]
  const objective = objectives[index]
  const newComments = objective?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  objectives[index] = {
    ...objective,
    comments: newComments
  }
  return objectives
}

export const addSpecificOComment = (submission, comment, index) => {
  const objectives = [...submission?.specificObjectives]
  const objective = objectives[index]
  const comments = objective?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  objectives[index] = {
    ...objective,
    comments: newComments
  }
  return objectives
}
