import { cloneDeep } from "lodash"
import { success, loadingAlert } from "../alert"
import { apolloError } from "../bugsnag/notify"

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
    data.developmentObjectiveIndicators = data.developmentObjectiveIndicators?.map(({ index, ...el }) => el)
    data.generalObjectiveIndicators = data.generalObjectiveIndicators?.map(({ index, ...el }) => el)
    data.specificObjectives = data.specificObjectives?.map(objective => {
      objective.activities = objective.activities?.map(({uuid, index, ...activity}) => activity)
      objective.indicators = objective.indicators?.map(({uuid, index, ...indicator}) => indicator)
      return objective
    })
    await updateSubmission({ variables: { data: { ...data, id } } })
    saving()
    success()
  }
  catch(e) {
    apolloError(e)
  }
  setState({ ...state, isSaving: false, technicalSpecification: {} })
}
