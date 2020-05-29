export const deleteSubmissionComments = (submission, toDelete) => {
  return submission?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
}
