export const onDeleteHelper = (comment, state, setState, toDelete, update) => {
  const { index, section } = state.field
  const { submission } = state

  let newSubmission = {}
  let newComments = []

  switch (section){
    case "submission":
      newComments = submission?.comments?.filter(e =>
        (e.comment !== comment.comment && e.createdAt !== comment.createdAt)
      )
      newSubmission = {
        ...submission,
        comments: newComments
      }
      update({ comments: newComments })
      newComments = newComments.filter(e => e.fieldName === state.field.name)
      break
    case "consultant":
      const consultant = submission?.consultant
      newComments = consultant?.comments?.filter((e, i) =>
        i !== toDelete
      )
      const newConsultant = {
        ...consultant,
        comments: newComments
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
    case "generalIndicator":
      const generalIndicators =
        [...submission?.generalObjectiveIndicators]
      const generalIndicator = generalIndicators[index]
      newComments = generalIndicator?.comments?.filter((e, i) =>
        i !== toDelete
      )
      generalIndicators[index] = {
        ...generalIndicator,
        comments: newComments
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
      newComments = developmentIndicator?.comments?.filter((e, i) =>
        i !== toDelete
      )
      developmentIndicators[index] = {
        ...developmentIndicator,
        comments: newComments
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
      newComments = budgetConcept?.comments?.filter((e, i) =>
        i !== toDelete
      )
      budgetConcepts[index] = {
        ...budgetConcept,
        comments: newComments
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
      newComments = humanResource?.comments?.filter((e, i) =>
        i !== toDelete
      )
      concepts[index] = {
        ...concept,
        humanResource: {
          ...humanResource,
          comments: newComments
        }
      }
      newSubmission = {
        ...submission,
        concepts: concepts
      }
      update({ concepts: concepts })
      break
    case "specificObjective":
      let specificObjectives = [...submission?.specificObjectives]
      let specificObjective = specificObjectives[index]
      newComments = specificObjective?.comments?.filter((e, i) =>
        i !== toDelete
      )
      specificObjectives[index] = {
        ...specificObjective,
        comments: newComments
      }
      newSubmission = {
        ...submission,
        specificObjectives: specificObjectives
      }
      update({ specificObjectives: specificObjectives })
      break
    case "specificIndicator":
      const indices = index.split("-")
      specificObjectives = [...submission?.specificObjectives]
      specificObjective = specificObjectives[indices[0]]
      const specificIndicators = specificObjective?.indicators
      const specificIndicator = specificIndicators[indices[1]]
      newComments = specificIndicator?.comments?.filter((e, i) =>
        i !== toDelete
      )
      specificIndicators[indices[1]] = {
        ...specificIndicator,
        comments: newComments
      }
      specificObjectives[indices[0]] = {
        ...specificObjective,
        indicators: specificIndicators
      }
      newSubmission = {
        ...submission,
        specificObjectives: specificObjectives
      }
      update({ specificObjectives: specificObjectives })
      break
    case "specificActivity":
      break
  }
  setState({ ...state, submission: newSubmission, comments: newComments })
}
