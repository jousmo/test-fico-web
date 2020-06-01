export const deleteBudgetComments = (submission, toDelete, index) => {
  const concepts = [...submission?.concepts]
  const concept = concepts[index]
  const newComments = concept?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  concepts[index] = {
    ...concept,
    comments: newComments
  }
  return concepts
}

export const addBudgetComment = (submission, comment, index) => {
  const concepts = [...submission?.concepts]
  const concept = concepts[index]
  const comments = concept?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  concepts[index] = {
    ...concept,
    comments: newComments
  }
  return concepts
}
