export const getCommentsHelper = (index, name, section, submission) => {
  let comments = []
  switch (section){
    case "submission":
      comments = submission?.comments
      break
    case "consultant":
      comments = submission?.consultant?.comments
      break
    case "generalIndicator":
      submission?.generalObjectiveIndicators[index]?.comments
      break
    case "developmentIndicator":
      comments =
        submission?.developmentObjectiveIndicators[index]?.comments
      break
    case "humanResource":
      comments = submission?.concepts[index]?.humanResource?.comments
      break
  }
  return comments?.filter(comment => (
    comment.fieldName === name
  ))
}
