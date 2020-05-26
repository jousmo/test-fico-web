export const onSaveHelper = (comment, update, state, setState, newFieldComments) => {
  const { index, section } = state.field
  const { submission } = state

  let newSubmission = {}

  switch (section){
    case "submission":
      const submissionComments = submission?.comments
      const newSubmissionComments = [
        ...submissionComments,
        comment
      ]
      newSubmission = {
        ...submission,
        comments: newSubmissionComments
      }
      update({ comments: newSubmissionComments })
      break
    case "consultant":
      const consultant = submission?.consultant
      const consultantComments = consultant?.comments || []
      const newConsultantComments = [
        ...consultantComments,
        comment
      ]
      const newConsultant = {
        ...consultant,
        comments: newConsultantComments
      }
      newSubmission = {
        ...submission,
        consultant: newConsultant
      }
      update({ consultant: newConsultant })
      break
    case "beneficiary":
      const beneficiaries = [...submission?.beneficiaries]
      const beneficiary = beneficiaries[index]
      const beneficiaryComments = beneficiary?.comments || []
      const newBeneficiaryComments = [
        ...beneficiaryComments,
        comment
      ]
      beneficiaries[index] = {
        ...beneficiary,
        comments: newBeneficiaryComments
      }
      update({ beneficiaries: beneficiaries })
      break
    case "generalIndicator":
      const generalIndicators =
        [...submission?.generalObjectiveIndicators]
      const generalIndicator = generalIndicators[index]
      const generalIndicatorComments = generalIndicator?.comments || []
      const generalComments = [
        ...generalIndicatorComments,
        comment
      ]
      generalIndicators[index] = {
        ...generalIndicator,
        comments: generalComments
      }
      newSubmission = {
        ...submission,
        generalObjectiveIndicators: generalIndicators
      }
      update({ generalObjectiveIndicators: generalIndicators })
      break
    case "developmentIndicator":
      const developmentIndicators =
        [...submission?.developmentObjectiveIndicators]
      const developmentIndicator = developmentIndicators[index]
      const developmentIndicatorComments = developmentIndicator?.comments || []
      const developmentComments = [
        ...developmentIndicatorComments,
        comment
      ]
      developmentIndicators[index] = {
        ...developmentIndicator,
        comments: developmentComments
      }
      newSubmission = {
        ...submission,
        developmentObjectiveIndicators: developmentIndicators
      }
      update({ developmentObjectiveIndicators: developmentIndicators })
      break
    case "budget":
      const budgetConcepts = [...submission?.concepts]
      const budgetConcept = budgetConcepts[index]
      const conceptComments = budgetConcept?.comments || []
      const newConceptComments = [
        ...conceptComments,
        comment
      ]
      budgetConcepts[index] = {
        ...budgetConcept,
        comments: newConceptComments
      }
      newSubmission = {
        ...submission,
        concepts: budgetConcepts
      }
      update({ concepts: budgetConcepts })
      break
    case "humanResource":
      const concepts = [...submission?.concepts]
      const concept = concepts[index]
      const humanResource = concept?.humanResource
      const humanResourceComments = humanResource?.comments || []
      const newHumanResourceComments = [
        ...humanResourceComments,
        comment
      ]
      const newHumanResource = {
        ...humanResource,
        comments: newHumanResourceComments
      }
      concepts[index] = {
        ...concept,
        humanResource: newHumanResource
      }
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
  }
  setState({ ...state, submission: newSubmission, comments: newFieldComments })
}
