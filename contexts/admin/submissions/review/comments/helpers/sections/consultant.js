export const deleteConsultantComments = (submission, toDelete) => {
  const consultant = submission?.consultant
  const newComments = consultant?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
  return {
    ...consultant,
    comments: newComments
  }
}

export const addConsultantComment = (submission, comment) => {
  const consultant = submission?.consultant
  const consultantComments = consultant?.comments || []
  const newComments = [
    ...consultantComments,
    comment
  ]
  return {
    ...consultant,
    comments: newComments
  }
}
