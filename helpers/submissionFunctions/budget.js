import { loadingAlert, success } from "../alert"
import { omit } from "lodash"
import { apolloError } from "../bugsnag/notify"

export const setUpdateBudget = (budget, state, setState) => {
  budget.concepts = budget?.concepts?.map(concept => omit(concept, ["budgeted"])) || []

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
  catch(err) {
    apolloError(err)
  }
  setState({ ...state, isSaving: false })
}
