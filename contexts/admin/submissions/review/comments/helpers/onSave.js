export const onSaveHelper = (comment, index, section, submission, update) => {
  switch (section){
    case "submission":
      const submissionComments = submission?.comments
      const newSubmissionComments = [
        ...submissionComments,
        comment
      ]
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
      update({ consultant: newConsultant })
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
      update({ developmentObjectiveIndicators: developmentIndicators })
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
      update({ concepts: concepts })
      break
  }
}
