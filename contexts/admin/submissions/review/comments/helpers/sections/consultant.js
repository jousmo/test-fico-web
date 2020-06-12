export const deleteConsultantComments = (submission, toDelete, index) => {
  const consultants = [...submission?.consultants]
  const consultant = consultants[index]
  const newComments = consultant?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  consultants[index] = {
    ...consultant,
    comments: newComments
  }
  return consultants
}

export const addConsultantComment = (submission, comment, index) => {
  const consultants = [...submission?.consultants]
  const consultant = consultants[index]
  const consultantComments = consultant?.comments || []
  const newComments = [
    ...consultantComments,
    comment
  ]
  consultants[index] = {
    ...consultant,
    comments: newComments
  }
  return consultants
}
