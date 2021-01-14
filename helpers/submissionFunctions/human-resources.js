import { loadingAlert, success, warning } from "../alert"
import { Bugsnag } from "../bugsnag"

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
  catch(e) {
    warning()
    Bugsnag.notify(new Error(e))
    console.error(e)
  }
  setState({ ...state, isSaving: false })
}
