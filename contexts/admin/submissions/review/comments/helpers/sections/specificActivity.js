export const deleteSpecificAComments = (submission, toDelete, index) => {
  const indices = index.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  delete objective.index
  const activities = objective?.activities
  const activity = activities[indices[1]]
  delete activity.index

  const newComments = activity?.comments?.filter(e => e.id !== toDelete.id)
  activities[indices[1]] = {
    ...activity,
    comments: newComments
  }
  objectives[indices[0]] = {
    ...objective,
    activities: activities
  }
  return {
    objectives,
    newComments
  }
}

export const addSpecificAComment = (submission, comment, index) => {
  const indices = index.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  delete objective.index
  const activities = objective?.activities
  const activity = activities[indices[1]]
  delete activity.index
  const comments = activity?.comments || []

  activities[indices[1]] = {
    ...activity,
    comments: [
      ...comments,
      comment
    ]
  }

  objectives[indices[0]] = {
    ...objective,
    activities: activities
  }
  return objectives
}
