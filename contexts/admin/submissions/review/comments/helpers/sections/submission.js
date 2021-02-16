export const deleteSubmissionComments = (submission, toDelete) => {
  return submission?.comments?.filter(e => e.id !== toDelete.id)
}

export const addSubmissionComment = (submission, comment) => {
  const submissionComments = submission?.comments
  return [
    ...submissionComments,
    comment
  ]
}
