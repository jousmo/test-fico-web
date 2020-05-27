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
      newComments = [...developmentIndicator?.comments].filter((e, i) =>
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
    case "humanResource":
      const concepts = [...submission?.concepts]
      const concept = concepts[index]
      const humanResource = concept?.humanResource
      newComments = [...humanResource.comments].filter((e, i) =>
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
  }
  setState({ ...state, submission: newSubmission, comments: newComments })
}
