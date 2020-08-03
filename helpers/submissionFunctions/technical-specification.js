import { cloneDeep } from "lodash"

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
    const data = cloneDeep(state.technicalSpecification)
    data.specificObjectives = data.specificObjectives?.map(objective => {
      objective.activities = objective.activities.map(({uuid, ...activity}) =>
        activity
      )

      objective.indicators = objective.indicators.map(({uuid, ...indicator}) =>
        indicator
      )

      return objective
    })
    const updatedSubmission = await updateSubmission({
      variables: { data: data, id: id }
    })

    /* TODO: Show feedback to the user */
  }
  catch(e) {
    console.error(e)
  }
}
