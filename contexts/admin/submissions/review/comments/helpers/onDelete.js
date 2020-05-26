export const onDeleteHelper = (index, section, submission, toDelete, update) => {
  let newComments = []
  switch (section){
    case "submission":
      newComments = [...submission?.comments].filter((e, i) =>
        i !== toDelete
      )
      update({ comments: newComments })
      break
    case "consultant":
      const consultant = submission?.consultant
      newComments = [...consultant?.comments].filter((e, i) =>
        i !== toDelete
      )
      const newConsultant = {
        ...consultant,
        comments: newComments
      }
      update({ consultant: newConsultant })
      break
    case "generalIndicator":
      const generalIndicators =
        [...submission?.generalObjectiveIndicators]
      const generalIndicator = generalIndicators[index]
      newComments = [...generalIndicator?.comments].filter((e, i) =>
        i !== toDelete
      )
      generalIndicators[index] = {
        ...generalIndicator,
        comments: newComments
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
      update({ developmentObjectiveIndicators: developmentIndicators })
      break
  }
  return newComments
}
