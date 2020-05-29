export const deleteBudgetComments = (submission, toDelete, index) => {
  const concepts = [...submission?.concepts]
  const concept = concepts[index]
  const newComments = concept?.comments?.filter((e, i) =>
    i !== toDelete
  )
  concepts[index] = {
    ...concept,
    comments: newComments
  }
  return concepts
}
