import { useCallback } from "react"

export const setUpdateGeneralInformation = (generalInformation, state, setState) => {
  const newGeneralInformation = {
    ...state.generalInformation,
    ...generalInformation
  }

  setState({...state, dirty: true, generalInformation: newGeneralInformation})
}

export const setSave = async (state, updateSubmission) => {
  try {
    const updatedSubmission = await updateSubmission({
      variables: { ...state.generalInformation, id: "1" }
    })

    /* TODO: Show feedback to the user */
  }
  catch(e) {
    console.error(e)
  }
}

export const getIsCall = (data, state) => {
  return state.generalInformation.type === "CALL" ||
    data?.Submission?.type === "CALL"
}

export const getHasConsultant = (data, state) => {
  const hasConsultant = state
    .generalInformation
    .hasConsultant

  const hasConsultantData = data
    ?.Submission
    ?.hasConsultant

  return hasConsultant === true ||
    (hasConsultantData === true && !state.dirty)
}

export const getHasConsultantReceivedSuppors = (data, state) => {
  const hadReceivedSupports = state
    .generalInformation
    .consultant
    .hadReceivedSupports

  const hadReceivedSupportsData = data
    ?.Submission
    ?.consultant
    ?.hadReceivedSupports

  return hadReceivedSupports === true ||
    (hadReceivedSupportsData === true && !state.dirty)
}
