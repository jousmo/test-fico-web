
export const setUpdateBudget = (budget, state, setState) => {
  const newBudget = {
    ...state.budget,
    ...budget
  }

  setState({
    ...state,
    dirty: true,
    budget: newBudget
  })
}

export const setSave = async (state, updateSubmission, id) => {
  try {
    const updatedSubmission = await updateSubmission({
      variables: { data: { ...state.budget }, id: id }
    })

    /* TODO: Show feedback to the user */
  }
  catch(e) {
    console.error(e)
  }
}
