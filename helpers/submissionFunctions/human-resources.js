import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setSave = async (state, setState, updateSubmission, updateComments) => {
  setState(state => ({ ...state, isSaving: true }))
  const saving = loadingAlert()
  try {
    if (state.comments) {
      await updateComments({ variables: { data: state.comments } })
    }

    await updateSubmission({
      variables: { data: state.humanResources }
    })
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
  setState(state => ({ ...state, comments: false, humanResources: [], isSaving: false }))
}
