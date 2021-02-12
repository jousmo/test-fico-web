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
    case "SUBMISSION": {
      newComments = deleteSubmissionComments(submission, comment)
      newSubmission = {
        ...submission,
        comments: newComments
      }
      update({ comments: newComments })
      break
    }
    case "CONSULTANT": {
      const consultants = deleteConsultantComments(submission, comment, index)
      newComments = consultants[index].comments
      newSubmission = {
        ...submission,
        consultants: consultants
      }
      update({ consultants: consultants })
      break
    }
    case "BENEFICIARY": {
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
    case "GENERAL_INDICATOR": {
      const indicators = deleteGeneralIComments(submission, comment, index)
      newComments = indicators[index]?.comments
      newSubmission = {
        ...submission,
        generalObjectiveIndicators: indicators
      }
      update({ generalObjectiveIndicators: indicators })
      break
    }
    case "DEVELOPMENT_INDICATOR": {
      const indicators = deleteDevelopmentIComments(submission, comment, index)
      newComments = indicators[index]?.comments
      newSubmission = {
        ...submission,
        developmentObjectiveIndicators: indicators
      }
      update({ developmentObjectiveIndicators: indicators })
      break
    }
    case "BUDGET": {
      const concepts = deleteBudgetComments(submission, comment, index)
      newComments = concepts[index]?.comments
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "HUMAN_RESOURCE": {
      const { concepts, humanResources } = deleteHRComments(submission, comment, index)
      newComments = humanResources[index]?.comments
      newSubmission = { ...submission, concepts }
      update(humanResources)
      break
    }
    case "SPECIFIC_OBJECTIVE": {
      const objectives = deleteSpecificOComments(submission, comment, index)
      newComments = objectives[index]?.comments
      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })
      break
    }
    case "SPECIFIC_INDICATOR": {
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
    case "SPECIFIC_ACTIVITY": {
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
  newComments = newComments?.filter(e => e.fieldName === state.field.name)
  setState({ ...state, submission: newSubmission, comments: newComments })
}
