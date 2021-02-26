import {
  addSubmissionComment,
  addConsultantComment,
  addBeneficiaryComment,
  addGeneralIComment,
  addDevelopmentIComment,
  addBudgetComment,
  addHRComment,
  addSpecificOComment,
  addSpecificIComment,
  addSpecificAComment
} from "./sections"

export const onSaveHelper = (
  comment,
  update,
  state,
  setState,
  newFieldComments
) => {
  const { index, section } = state.field
  const { submission } = state

  let newSubmission = {}

  switch (section){
    case "SUBMISSION": {
      const comments = addSubmissionComment(submission, comment)
      newSubmission = { ...submission, comments }
      update({ comments })
      break
    }
    case "CONSULTANT": {
      const consultants = addConsultantComment(submission, comment, index)
      newSubmission = {...submission, consultants }
      update({ consultants })
      break
    }
    case "BENEFICIARY": {
      const beneficiaries = addBeneficiaryComment(submission, comment, index)
      newSubmission = { ...submission, beneficiaries }
      update({ beneficiaries })
      break
    }
    case "GENERAL_INDICATOR": {
      const generalObjectiveIndicators = addGeneralIComment(submission, comment, index)
      newSubmission = { ...submission, generalObjectiveIndicators }
      update({ generalObjectiveIndicators })
      break
    }
    case "DEVELOPMENT_INDICATOR": {
      const developmentObjectiveIndicators = addDevelopmentIComment(submission, comment, index)
      newSubmission = { ...submission, developmentObjectiveIndicators }
      update({ developmentObjectiveIndicators })
      break
    }
    case "BUDGET": {
      const concepts = addBudgetComment(submission, comment, index)
      newSubmission = { ...submission, concepts }
      update({ concepts })
      break
    }
    case "HUMAN_RESOURCE": {
      const { concepts, humanResources } = addHRComment(submission, comment, index)
      newSubmission = { ...submission, concepts }
      update(humanResources)
      break
    }
    case "SPECIFIC_OBJECTIVE": {
      const specificObjectives = addSpecificOComment(submission, comment, index)
      newSubmission = { ...submission, specificObjectives }
      update({ specificObjectives })
      break
    }
    case "SPECIFIC_INDICATOR": {
      const specificObjectives = addSpecificIComment(submission, comment, index)
      if (specificObjectives === false) {
        newSubmission = { ...submission }
        break
      }

      newSubmission = { ...submission, specificObjectives }
      update({ specificObjectives })
      break
    }
    case "SPECIFIC_ACTIVITY": {
      const specificObjectives = addSpecificAComment(submission, comment, index)
      if (specificObjectives === false) {
        newSubmission = { ...submission }
        break
      }

      newSubmission = { ...submission, specificObjectives }
      update({ specificObjectives })
      break
    }
    default:
      break
  }
  setState({ ...state, submission: newSubmission, comments: newFieldComments })
}
