export const deleteHRComments = (submission, toDelete, index) => {
  const concepts = [...submission?.concepts]
  const concept = concepts[index]
  const humanResource = concept?.humanResource
  const newComments = humanResource?.comments?.filter((e, i) =>
    i !== toDelete
  )
  concepts[index] = {
    ...concept,
    humanResource: {
      ...humanResource,
      comments: newComments
    }
  }
  return concepts
}
