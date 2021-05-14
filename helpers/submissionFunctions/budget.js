import { loadingAlert, success } from "../alert"
import { omit } from "lodash"
import { apolloError } from "../bugsnag/notify"

export const setUpdateBudget = (data, state, setState) => {
  data.concepts = data?.concepts?.map(concept => omit(concept, ["budgeted"])) || []
  const budget = { ...state.budget, ...data }
  setState({ ...state, dirty: true, budget })
}

export const setSave = async (state, setState, updateSubmission, id, updateComments) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    if (state.comments) {
      await updateComments({ variables: { data: state.comments } })
    }

    await updateSubmission({
      variables: { data: { id, ...state.budget }  }
    })
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
  setState({ ...state, comments: false, budget: {}, isSaving: false })
}
