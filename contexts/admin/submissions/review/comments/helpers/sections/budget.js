export const deleteBudgetComments = (submission, toDelete, i) => {
  const concepts = [...submission?.concepts]
  const { index, ...concept } = concepts[i]
  const newComments = concept?.comments?.filter(e => e.id !== toDelete.id)
  concepts[i] = {
    ...concept,
    comments: newComments
  }
  return concepts
}

export const addBudgetComment = (submission, comment, i) => {
  const concepts = [...submission?.concepts]
  const { index, ...concept } = concepts[i]
  const comments = concept?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  concepts[i] = {
    ...concept,
    comments: newComments
  }
  return concepts
}
