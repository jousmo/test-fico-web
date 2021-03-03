import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setSave = async (humanResources, setState, updateSubmission) => {
  setState(state => ({ ...state, isSaving: true }))
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: humanResources }
    })
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
  setState(state => ({ ...state, humanResources: [], isSaving: false }))
}
