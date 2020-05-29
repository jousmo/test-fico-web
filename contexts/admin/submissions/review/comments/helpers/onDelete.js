import {
  deleteSubmissionComments,
  deleteConsultantComments,
  deleteGeneralIComments,
  deleteDevelopmentIComments,
  deleteBudgetComments,
  deleteHRComments,
  deleteSpecificOComments,
  deleteSpecificIComments,
  deleteSpecificAComments
} from "./sections"

export const onDeleteHelper = (comment, state, setState, toDelete, update) => {
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
      newComments = newComments.filter(e => e.fieldName === state.field.name)
      break
    }
    case "consultant": {
      const newConsultant = deleteConsultantComments(submission, toDelete)
      newSubmission = {
        ...submission,
        consultant: newConsultant
      }
      update({ consultant: newConsultant })
      break
    }
    case "beneficiary": {
      const beneficiaries = [...submission?.beneficiaries]
      const beneficiary = beneficiaries[index]
      newComments = [...beneficiary?.comments].filter((e, i) =>
        i !== toDelete
      )
      beneficiaries[index] = {
        ...beneficiary,
        comments: newComments
      }
      newSubmission = {
        ...submission,
        beneficiaries: beneficiaries
      }
      update({ beneficiaries: beneficiaries })
      break
    }
    case "generalIndicator": {
      const indicators = deleteGeneralIComments(submission, toDelete, index)
      newSubmission = {
        ...submission,
        generalObjectiveIndicators: indicators
      }
      update({ generalObjectiveIndicators: indicators })
      break
    }
    case "developmentIndicator": {
      const indicators = deleteDevelopmentIComments(submission, toDelete, index)
      newSubmission = {
        ...submission,
        developmentObjectiveIndicators: indicators
      }
      update({ developmentObjectiveIndicators: indicators })
      break
    }
    case "budget": {
      const concepts = deleteBudgetComments(submission, toDelete, index)
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "humanResource": {
      const concepts = deleteHRComments(submission, toDelete, index)
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "specificObjective": {
      const objectives = deleteSpecificOComments(submission, toDelete, index)
      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })
      break
    }
    case "specificIndicator": {
      const objectives = deleteSpecificIComments(submission, toDelete, index)
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
    case "specificActivity": {
      const objectives = deleteSpecificAComments(submission, toDelete, index)
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
  setState({ ...state, submission: newSubmission, comments: newComments })
}
