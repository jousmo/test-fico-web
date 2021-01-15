import { cloneDeep } from "lodash"
import { success, loadingAlert, warning } from "../alert"
import { Bugsnag } from "../bugsnag"

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
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    const data = cloneDeep(state.technicalSpecification)
    data.specificObjectives = data.specificObjectives?.map(objective => {
      objective.activities = objective.activities?.map(({uuid, index, ...activity}) =>
        activity
      )

      objective.indicators = objective.indicators?.map(({uuid, index, ...indicator}) =>
        indicator
      )

      return objective
    })
    await updateSubmission({ variables: { data: data, id: id } })
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
