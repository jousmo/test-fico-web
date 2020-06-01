import {
  deleteSubmissionComments,
  deleteConsultantComments,
  deleteBeneficiaryComments,
  deleteGeneralIComments,
  deleteDevelopmentIComments,
  deleteBudgetComments,
  deleteHRComments,
  deleteSpecificOComments,
  deleteSpecificIComments,
  deleteSpecificAComments
} from "./sections"

export const onDeleteHelper = (comment, state, setState, update) => {
  const { index, section } = state.field
  const { submission } = state

  let newSubmission = {}
  let newComments = []

  switch (section){
    case "submission": {
      newComments = deleteSubmissionComments(submission, comment)
      newSubmission = {
        ...submission,
        comments: newComments
      }
      update({ comments: newComments })
      break
    }
    case "consultant": {
      const newConsultant = deleteConsultantComments(submission, comment)
      newComments = newConsultant.comments
      newSubmission = {
        ...submission,
        consultant: newConsultant
      }
      update({ consultant: newConsultant })
      break
    }
    case "beneficiary": {
      const beneficiaries =
        deleteBeneficiaryComments(submission, comment, index)
      newComments = beneficiaries[index].comments
      newSubmission = {
        ...submission,
        beneficiaries: beneficiaries
      }
      update({ beneficiaries: beneficiaries })
      break
    }
    case "generalIndicator": {
      const indicators = deleteGeneralIComments(submission, comment, index)
      newComments = indicators[index]?.comments
      newSubmission = {
        ...submission,
        generalObjectiveIndicators: indicators
      }
      update({ generalObjectiveIndicators: indicators })
      break
    }
    case "developmentIndicator": {
      const indicators = deleteDevelopmentIComments(submission, comment, index)
      newComments = indicators[index]?.comments
      newSubmission = {
        ...submission,
        developmentObjectiveIndicators: indicators
      }
      update({ developmentObjectiveIndicators: indicators })
      break
    }
    case "budget": {
      const concepts = deleteBudgetComments(submission, comment, index)
      newComments = concepts[index]?.comments
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "humanResource": {
      const concepts = deleteHRComments(submission, comment, index)
      newComments = concepts[index]?.humanResource?.comments
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "specificObjective": {
      const objectives = deleteSpecificOComments(submission, comment, index)
      newComments = objectives[index]?.comments
      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })
      break
    }
    case "specificIndicator": {
      const objectives = deleteSpecificIComments(submission, comment, index)
      newComments = objectives.newComments
      if (objectives === false) {
        newSubmission = { ...submission }
        break
      }

      newSubmission = {
        ...submission,
        specificObjectives: objectives.objectives
      }
      update({ specificObjectives: objectives.objectives })
      break
    }
    case "specificActivity": {
      const objectives = deleteSpecificAComments(submission, comment, index)
      newComments = objectives?.newComments
      if (objectives === false) {
        newSubmission = { ...submission }
        break
      }
      newSubmission = {
        ...submission,
        specificObjectives: objectives.objectives
      }
      update({ specificObjectives: objectives.objectives })
      break
    }
    default:
      break
  }
  newComments = newComments.filter(e => e.fieldName === state.field.name)
  setState({ ...state, submission: newSubmission, comments: newComments })
}
