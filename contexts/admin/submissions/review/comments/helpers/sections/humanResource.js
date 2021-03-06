import { cloneDeep } from "lodash"

const getHumanResources = submission => {
  const humanResources = []
  const concepts = cloneDeep(submission?.concepts)?.map(({ budgeted, ...concept }) => {
    if (concept.humanResource?.[0]) {
      humanResources.push(concept.humanResource[0])
    }
    return concept
  })
  return { concepts, humanResources }
}

export const deleteHRComments = (submission, toDelete, index) => {
  const { concepts, humanResources } = getHumanResources(submission)
  const conceptIndex = concepts.findIndex(el => el.humanResource[0]?.id === humanResources[index].id)

  const newComments = humanResources[index]?.comments?.filter(e => e.id !== toDelete.id)
  const newHR = { ...humanResources[index], comments: newComments }

  humanResources[index] = newHR
  concepts[conceptIndex].humanResource[0] = newHR

  return { concepts, humanResources }
}

export const addHRComment = (submission, comment, index) => {
  const { concepts, humanResources } = getHumanResources(submission)
  const conceptIndex = concepts.findIndex(el => el.humanResource[0]?.id === humanResources[index].id)

  const comments = [...humanResources[index]?.comments] || []
  const newComments = [...comments, comment]
  const newHR = { ...humanResources[index], comments: newComments }

  humanResources[index] = newHR
  concepts[conceptIndex].humanResource[0] = newHR

  return { concepts, humanResources }
}
