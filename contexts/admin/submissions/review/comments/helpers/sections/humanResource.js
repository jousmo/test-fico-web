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

export const addHRComment = (submission, comment, index) => {
  const concepts = [...submission?.concepts]
  const concept = concepts[index]
  const humanResource = concept?.humanResource
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
