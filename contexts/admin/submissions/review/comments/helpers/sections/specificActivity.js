export const deleteSpecificAComments = (submission, toDelete, index) => {
  const indices = index.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  const activities = objective?.activities
  const activity = activities[indices[1]]

  const newComments = activity?.comments?.filter((e, i) =>
    i !== toDelete
  )
  activities[indices[1]] = {
    ...activity,
    comments: newComments
  }
  objectives[indices[0]] = {
    ...objective,
    activities: activities
  }
  return objectives
}
