export const getCommentsHelper = (index, name, section, submission) => {
  let comments = []
  switch (section){
    case "submission":
      comments = submission?.comments
      break
    case "consultant":
      comments = submission?.consultant?.comments
      break
    case "beneficiary":
      comments = submission?.beneficiaries[index]?.comments
      break
    case "generalIndicator":
      comments = submission?.generalObjectiveIndicators[index]?.comments
      break
    case "developmentIndicator":
      comments =
        submission?.developmentObjectiveIndicators[index]?.comments
      break
    case "budget":
      comments = submission?.concepts[index]?.comments
      break
    case "humanResource":
      comments = submission?.concepts[index]?.humanResource?.comments
      break
    case "specificObjective":
      comments = submission?.specificObjectives[index]?.comments
      break
    case "specificIndicator":
      let indices = index.split("-")
      if (indices[1] === `undefined`){
        break
      }
      comments =
        submission?.specificObjectives[indices[0]]?.indicators[indices[1]]?.comments
      break
    case "specificActivity":
      indices = index.split("-")
      if (indices[1] === `undefined`){
        break
      }
      comments =
        submission?.specificObjectives[indices[0]]?.activities[indices[1]]?.comments
      break
  }
  return comments?.filter(comment => (
    comment.fieldName === name
  ))
}
