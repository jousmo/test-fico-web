import { loadingAlert, success, warning } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setReviewedComments = async (data, setState, updateComments) => {
  if (!data.length) {
    warning("Necesitas marcar mínimo un comentario")
    return
  }

  setState(state => ({ ...state, isSaving: true }))
  const saving = loadingAlert()
  try {
    await updateComments({ variables: { data } })
    saving()
    success()
  }
  catch(err) {
    apolloError(err)
  }
  setState(state => ({ ...state, isSaving: false }))
}