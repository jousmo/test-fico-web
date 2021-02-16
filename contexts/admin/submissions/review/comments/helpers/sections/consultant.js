export const deleteConsultantComments = (submission, toDelete, i) => {
  const consultants = [...submission?.consultants]
  const { index, ...consultant } = consultants[i]
  const newComments = consultant?.comments?.filter(e => e.id !== toDelete.id)
  consultants[i] = {
    ...consultant,
    comments: newComments
  }
  return consultants
}

export const addConsultantComment = (submission, comment, i) => {
  const consultants = [...submission?.consultants]
  const { index, ...consultant } = consultants[i]
  const consultantComments = consultant?.comments || []
  const newComments = [
    ...consultantComments,
    comment
  ]
  consultants[i] = {
    ...consultant,
    comments: newComments
  }
  return consultants
}
