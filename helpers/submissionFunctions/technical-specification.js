import { cloneDeep } from "lodash"
import { success, loadingAlert } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setUpdateTechnicalSpecification = (technicalSpecification, state, setState) => {
  const newTechnicalSpecification = {
    ...technicalSpecification,
    ...state.technicalSpecification
  }

  setState({
    ...state,
    dirty: true,
    technicalSpecification: newTechnicalSpecification
  })
}

export const setSave = async (state, setState, updateSubmission, id, updateComments) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    if (state.comments) {
      await updateComments({ variables: { data: state.comments } })
    }

    const data = cloneDeep(state.technicalSpecification)
    data.developmentObjectiveIndicators = data.developmentObjectiveIndicators?.map(({ index, ...el }) => el)
    data.generalObjectiveIndicators = data.generalObjectiveIndicators?.map(({ index, ...el }) => el)
    data.specificObjectives = data.specificObjectives?.map(objective => {
      objective.activities = objective.activities?.map(({uuid, index, ...activity}) => activity)
      objective.indicators = objective.indicators?.map(({uuid, index, ...indicator}) => indicator)
      return objective
    })
    await updateSubmission({ variables: { data: { ...data, id } } })
    success()
  }
  catch(e) {
    apolloError(e)
  }
  saving()
  setState({ ...state, comments: false, isSaving: false, technicalSpecification: {} })
}
