
export const setUpdateHumanResources = (humanResource, state, setState) => {
  const newHumanResources = {
    ...state.humanResources,
    ...humanResource
  }

  setState({
    ...state,
    dirty: true,
    humanResources: newHumanResources
  })
}

export const setSave = async (state, updateSubmission, id) => {
  try {
    const humanResources = { ...state.humanResources }
    humanResources.concepts?.forEach(concept => delete concept.humanResource.key)
    const updatedSubmission = await updateSubmission({
      variables: { data: { ...humanResources }, id: id }
    })

    /* TODO: Show feedback to the user */
  }
  catch(e) {
    console.error(e)
  }
}
