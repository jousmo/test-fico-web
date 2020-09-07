import { loadingAlert, success, warning } from "../alert"

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

export const setSave = async (state, setState, updateSubmission, id) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: { ...state.budget }, id: id }
    })
    saving()
    success()
  }
  catch(e) {
    warning()
    console.error(e)
  }
  setState({ ...state, isSaving: false })
}
