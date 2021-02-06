import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setUpdateHumanResources = (concepts, state, setState) => {
  setState({
    ...state,
    dirty: true,
    concepts
  })
}

export const setSave = async (state, setState, updateSubmission) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: state.concepts }
    })
    saving()
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
  setState({ ...state, isSaving: false })
}
