import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setReviewedComments = async (data, setState) => {
  setState(state => ({ ...state, dirty: true, comments: [...state.comments || [], ...data] }))
}

export const setSave = async (comments, updateComments, id) => {
  const saving = loadingAlert()
  try {
    await updateComments({
      variables: { data: { comments, id } }
    })
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
}
