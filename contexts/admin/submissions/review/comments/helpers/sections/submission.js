export const deleteSubmissionComments = (submission, toDelete) => {
  return submission?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
}

export const addSubmissionComment = (submission, comment) => {
  const submissionComments = submission?.comments
  return [
    ...submissionComments,
    comment
  ]
}
