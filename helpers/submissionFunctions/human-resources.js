
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
    const updatedSubmission = await updateSubmission({
      variables: { data: { ...state.humanResources }, id: id }
    })

    /* TODO: Show feedback to the user */
  }
  catch(e) {
    console.error(e)
  }
}
