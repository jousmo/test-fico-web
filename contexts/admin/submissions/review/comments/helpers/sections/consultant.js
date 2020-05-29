export const deleteConsultantComments = (submission, toDelete) => {
  const consultant = submission?.consultant
  const newComments = consultant?.comments?.filter((e, i) =>
    i !== toDelete
  )
  return {
    ...consultant,
    comments: newComments
  }
}
