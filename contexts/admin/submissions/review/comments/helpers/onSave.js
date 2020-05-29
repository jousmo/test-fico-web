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

export const onSaveHelper = (comment, update, state, setState, newFieldComments) => {
  const { index, section } = state.field
  const { submission } = state

  let newSubmission = {}

  switch (section){
    case "submission": {
      const newComments = addSubmissionComment(submission, comment)
      newSubmission = {
        ...submission,
        comments: newComments
      }
      update({ comments: newComments })
      break
    }
    case "consultant":
      const newConsultant = addConsultantComment(submission, comment)
      newSubmission = {
        ...submission,
        consultant: newConsultant
      }
      update({ consultant: newConsultant })
      break
    case "beneficiary": {
      const beneficiaries = addBeneficiaryComment(submission, comment, index)
      newSubmission = {
        ...submission,
        beneficiaries: beneficiaries
      }
      update({ beneficiaries: beneficiaries })
      break
    }
    case "generalIndicator": {
      const indicators = addGeneralIComment(submission, comment, index)
      newSubmission = {
        ...submission,
        generalObjectiveIndicators: indicators
      }
      update({ generalObjectiveIndicators: indicators })
      break
    }
    case "developmentIndicator": {
      const indicators = addDevelopmentIComment(submission, comment, index)
      newSubmission = {
        ...submission,
        developmentObjectiveIndicators: indicators
      }
      update({ developmentObjectiveIndicators: indicators })
      break
    }
    case "budget": {
      const concepts = addBudgetComment(submission, comment, index)
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "humanResource": {
      const concepts = addHRComment(submission, comment, index)
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    }
    case "specificObjective": {
      const objectives = addSpecificOComment(submission, comment, index)
      newSubmission = {
        ...submission,
        specificObjectives: objectives
      }
      update({ specificObjectives: objectives })
      break
    }
    case "specificIndicator": {
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
    case "specificActivity": {
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
  }
  setState({ ...state, submission: newSubmission, comments: newFieldComments })
}
