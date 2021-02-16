export const deleteBeneficiaryComments = (submission, toDelete, i) => {
  const beneficiaries = [...submission?.beneficiaries]
  const { index, ...beneficiary } = beneficiaries[i]
  const newComments = [...beneficiary?.comments]?.filter(e => e.id !== toDelete.id)
  beneficiaries[i] = {
    ...beneficiary,
    comments: newComments
  }
  return beneficiaries
}

export const addBeneficiaryComment = (submission, comment, i) => {
  const beneficiaries = [...submission?.beneficiaries]
  const { index, ...beneficiary } = beneficiaries[i]
  const comments = beneficiary?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  beneficiaries[i] = {
    ...beneficiary,
    comments: newComments
  }
  return beneficiaries
}
