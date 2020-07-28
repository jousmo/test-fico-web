
export const setUpdateTechnicalSpecification = (technicalSpecification, state, setState) => {
  const newTechnicalSpecification = {
    ...state.technicalSpecification,
    ...technicalSpecification
  }

  setState({
    ...state,
    dirty: true,
    technicalSpecification: newTechnicalSpecification
  })
}

export const setSave = async (state, updateSubmission, id) => {
  try {
    const data = { ...state.technicalSpecification }
    data.developmentObjectiveIndicators?.forEach(indicator =>
      delete indicator.id
    )
    data.generalObjectiveIndicators?.forEach(indicator =>
      delete indicator.id
    )
    const updatedSubmission = await updateSubmission({
      variables: { data: { ...data }, id: id }
    })

    /* TODO: Show feedback to the user */
  }
  catch(e) {
    console.error(e)
  }
}
