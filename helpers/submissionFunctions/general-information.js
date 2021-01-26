import { success, loadingAlert } from "../alert"
import { apolloError } from "../bugsnag/notify"

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
  catch(err) {
    apolloError(err)
  }
  setState({ ...state, isSaving: false })
}

export const getIsCall = (data, state) => {
  return state.generalInformation.type === "CALL" ||
    data?.Submission?.type === "CALL"
}
