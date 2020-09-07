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
      const newComments = addSubmissionComment(submission, comment)
      newSubmission = {
        ...submission,
        comments: newComments
      }
      update({ comments: newComments })
      break
    }
    case "CONSULTANT": {
      const consultants = addConsultantComment(submission, comment, index)
      newSubmission = {
        ...submission,
        consultants: consultants
      }
      update({ consultants: consultants })
      break
    }
    case "BENEFICIARY": {
      const beneficiaries = addBeneficiaryComment(submission, comment, index)
      newSubmission = {
        ...submission,
        beneficiaries: beneficiaries
      }
      update({ beneficiaries: beneficiaries })
      break
    }
    case "GENERAL_INDICATOR": {
      const indicators = addGeneralIComment(submission, comment, index)
      newSubmission = {
        ...submission,
        generalObjectiveIndicators: indicators
      }
      update({ generalObjectiveIndicators: indicators })
      break
    }
    case "DEVELOPMENT_INDICATOR": {
      const indicators = addDevelopmentIComment(submission, comment, index)
      newSubmission = {
        ...submission,
        developmentObjectiveIndicators: indicators
      }
      update({ developmentObjectiveIndicators: indicators })
      break
    }
    case "BUDGET": {
      const concepts = addBudgetComment(submission, comment, index)
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "HUMAN_RESOURCE": {
      const concepts = addHRComment(submission, comment, index)
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "SPECIFIC_OBJECTIVE": {
      const objectives = addSpecificOComment(submission, comment, index)
      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })
      break
    }
    case "SPECIFIC_INDICATOR": {
      const objectives = addSpecificIComment(submission, comment, index)
      if (objectives === false) {
        newSubmission = { ...submission }
        break
      }

      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })
      break
    }
    case "SPECIFIC_ACTIVITY": {
      const objectives = addSpecificAComment(submission, comment, index)
      if (objectives === false) {
        newSubmission = { ...submission }
        break
      }
      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })

      break
    }
    default:
      break
  }
  setState({ ...state, submission: newSubmission, comments: newFieldComments })
}
