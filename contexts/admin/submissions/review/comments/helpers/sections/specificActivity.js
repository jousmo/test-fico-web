export const deleteSpecificAComments = (submission, toDelete, index) => {
  const indices = index.split("-")
  if(indices[1] === `undefined`){
    return false
  }

  const objectives = [...submission?.specificObjectives]
  const objective = objectives[indices[0]]
  const activities = objective?.activities
  const activity = activities[indices[1]]

  const newComments = activity?.comments?.filter(e =>
    (e.comment !== toDelete.comment && e.createdAt !== toDelete.createdAt)
  )
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
  const activities = objective?.activities
  const activity = activities[indices[1]]
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
