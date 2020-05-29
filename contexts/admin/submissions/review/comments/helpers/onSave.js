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
      newSubmission = {
        ...submission,
        beneficiaries: beneficiaries
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
    case "specificObjective":
      const specificObjectives = [...submission?.specificObjectives]
      const specificObjective = specificObjectives[index]
      const specificObjectiveComments = specificObjective?.comments || []
      const newSpecificObjectiveComments = [
        ...specificObjectiveComments,
        comment
      ]
      specificObjectives[index] = {
        ...specificObjective,
        comments: newSpecificObjectiveComments
      }
      newSubmission = {
        ...submission,
        specificObjectives: specificObjectives
      }
      update({ specificObjectives: specificObjectives })
      break
    case "specificIndicator":
      const indices = index.split("-")
      if(indices[1] === `undefined`){
        newSubmission = { ...submission }
        break
      }

      const specificInObjectives = [...submission?.specificObjectives]
      const specificInObjective = specificInObjectives[indices[0]]
      const specificIndicators = specificInObjective?.indicators
      const specificIndicator = specificIndicators[indices[1]]
      const specificIndicatorComments = specificIndicator?.comments || []

      specificIndicators[indices[1]] = {
        ...specificIndicator,
        comments: [
          ...specificIndicatorComments,
          comment
        ]
      }
      specificInObjectives[indices[0]] = {
        ...specificInObjective,
        indicators: specificIndicators
      }
      newSubmission = {
        ...submission,
        specificObjectives: specificInObjectives
      }
      update({ specificObjectives: specificInObjectives })
      break
    case "specificActivity":
      const activityIndices = index.split("-")
      if(activityIndices[1] === `undefined`){
        newSubmission = { ...submission }
        break
      }

      const specificAcObjectives = [...submission?.specificObjectives]
      const specificAcObjective = specificAcObjectives[activityIndices[0]]
      const specificActivities = specificAcObjective?.activities
      const specificActivity = specificActivities[activityIndices[1]]
      const specificActivityComments = specificActivity?.comments || []

      specificActivities[activityIndices[1]] = {
        ...specificActivity,
        comments: [
          ...specificActivityComments,
          comment
        ]
      }
      specificAcObjectives[activityIndices[0]] = {
        ...specificAcObjective,
        activities: specificActivities
      }
      newSubmission = {
        ...submission,
        specificObjectives: specificAcObjectives
      }
      update({ specificObjectives: specificAcObjectives })

      break
  }
  setState({ ...state, submission: newSubmission, comments: newFieldComments })
}
