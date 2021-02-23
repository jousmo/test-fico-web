import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setUpdateBudget = (data, state, setState) => {
  const budget = { ...state.budget, ...data }
  setState({ ...state, dirty: true, budget })
}

export const setSave = async (state, setState, updateSubmission, id) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: { id, ...state.budget }  }
    })
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
  setState({ ...state, budget: {}, isSaving: false })
}
