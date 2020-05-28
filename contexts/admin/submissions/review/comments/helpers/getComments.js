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
      let objectiveIndex = index.split("-")[0]
      const indicatorIndex = index.split("-")[1]
      comments =
        submission?.specificObjectives[objectiveIndex].indicators[indicatorIndex]
      break
    case "specificActivity":
      objectiveIndex = index.split("-")[0]
      const activityIndex = index.split("-")[1]
      comments =
        submission?.specificObjectives[objectiveIndex].activities[activityIndex]
      break
  }
  return comments?.filter(comment => (
    comment.fieldName === name
  ))
}
