
export const setUpdateGeneralInformation = (generalInformation, state, setState) => {
  const newGeneralInformation = {
    ...state.generalInformation,
    ...generalInformation
  }

  setState({...state, dirty: true, generalInformation: newGeneralInformation})
}

export const setSave = async (state, updateSubmission, id) => {
  try {
    const updatedSubmission = await updateSubmission({
      variables: { data: { ...state.generalInformation }, id: id }
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
