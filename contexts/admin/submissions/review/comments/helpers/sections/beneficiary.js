export const deleteBeneficiaryComments = (submission, toDelete, index) => {
  const beneficiaries = [...submission?.beneficiaries]
  const beneficiary = beneficiaries[index]
  const newComments = [...beneficiary?.comments].filter((e, i) =>
    i !== toDelete
  )
  beneficiaries[index] = {
    ...beneficiary,
    comments: newComments
  }
  return beneficiaries
}

export const addBeneficiaryComment = (submission, comment, index) => {
  const beneficiaries = [...submission?.beneficiaries]
  const beneficiary = beneficiaries[index]
  const comments = beneficiary?.comments || []
  const newComments = [
    ...comments,
    comment
  ]
  beneficiaries[index] = {
    ...beneficiary,
    comments: newComments
  }
  return beneficiaries
}
