import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setUpdateHumanResources = (humanResource, state, setState) => {
  const newHumanResources = {
    ...state.humanResources,
    ...humanResource
  }

  setState({
    ...state,
    dirty: true,
    humanResources: newHumanResources
  })
}

export const setSave = async (state, setState, updateSubmission, id) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: state.humanResources, id: id }
    })
    saving()
    success()
  }
  catch(err) {
    apolloError(err)
  }
  setState({ ...state, isSaving: false })
}
