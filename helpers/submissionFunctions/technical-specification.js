import { cloneDeep } from "lodash"
import { success, loadingAlert } from "../alert"

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

export const setSave = async (state, setState, updateSubmission, id) => {
  try {
    const saving = loadingAlert()
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
    await updateSubmission({
      variables: { data: data, id: id }
    })
    setState({ ...state, technicalSpecification: {} })
    saving()
    success()
  }
  catch(e) {
    console.error(e)
  }
}
