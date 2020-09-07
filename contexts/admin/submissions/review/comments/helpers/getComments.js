export const getCommentsHelper = (index, name, section, submission) => {
  let comments = []
  switch (section){
    case "SUBMISSION":
      comments = submission?.comments
      break
    case "CONSULTANT":
      comments = submission?.consultants[index]?.comments
      break
    case "BENEFICIARY":
      comments = submission?.beneficiaries[index]?.comments
      break
    case "GENERAL_INDICATOR":
      comments = submission?.generalObjectiveIndicators[index]?.comments
      break
    case "DEVELOPMENT_INDICATOR":
      comments =
        submission?.developmentObjectiveIndicators[index]?.comments
      break
    case "BUDGET":
      comments = submission?.concepts[index]?.comments
      break
    case "HUMAN_RESOURCE":
      comments = submission?.concepts[index]?.humanResource[0]?.comments
      break
    case "SPECIFIC_OBJECTIVE":
      comments = submission?.specificObjectives[index]?.comments
      break
    case "SPECIFIC_INDICATOR":
      let indices = index.split("-")
      if (indices[1] === `undefined`){
        break
      }
      comments =
        submission?.specificObjectives[indices[0]]?.indicators[indices[1]]?.comments
      break
    case "SPECIFIC_ACTIVITY": {
      let indices = index.split("-")
      if (indices[1] === `undefined`){
        break
      }
      comments =
        submission?.specificObjectives[indices[0]]?.activities[indices[1]]?.comments
      break
    }
  }
  return comments?.filter(comment => (
    comment.fieldName === name
  ))
}
