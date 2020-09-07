export const deleteHRComments = (submission, toDelete, index) => {
  const concepts = [...submission?.concepts].map(({ budgeted, ...concept }) => concept)
  const concept = concepts[index]
  const humanResource = concept?.humanResource[0]
  const newComments = humanResource?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
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

export const addHRComment = (submission, comment, index) => {
  const concepts = [...submission?.concepts].map(({ budgeted, ...concept }) => concept)
  const concept = concepts[index]
  const humanResource = concept?.humanResource[0]
  const comments = humanResource?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  const newHumanResource = {
    ...humanResource,
    comments: newComments
  }
  concepts[index] = {
    ...concept,
    humanResource: newHumanResource
  }
  return concepts
}
