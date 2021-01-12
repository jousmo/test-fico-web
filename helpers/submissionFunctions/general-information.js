import { success, loadingAlert, warning } from "../alert"
import { Bugsnag } from "../bugsnag"

export const setUpdateGeneralInformation = (generalInformation, state, setState) => {
  const newGeneralInformation = {
    ...state.generalInformation,
    ...generalInformation
  }

  setState({...state, dirty: true, generalInformation: newGeneralInformation})
}

export const setSave = async (state, setState, updateSubmission, id) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: { ...state.generalInformation }, id: id }
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

export const getIsCall = (data, state) => {
  return state.generalInformation.type === "CALL" ||
    data?.Submission?.type === "CALL"
}
