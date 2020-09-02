import { loadingAlert, success, warning } from "../alert"

export const setUpdateHumanResources = (humanResource, state, setState) => {
  const newHumanResources = {
    ...state.humanResources,
    ...humanResource
  }

  setState({
    ...state,
    dirty: true,
    humanResources: newHumanResources
  })
}

export const setSave = async (state, setState, updateSubmission, id) => {
  setState({ ...state, isSaving: true })
  const saving = loadingAlert()
  try {
    const humanResources = { ...state.humanResources }
    humanResources.concepts?.forEach(({ humanResource }) =>
      humanResource[0] && delete humanResource[0].key
    )
    await updateSubmission({
      variables: { data: { ...humanResources }, id: id }
    })
    saving()
    success()
  }
  catch(e) {
    warning()
    console.error(e)
  }
  setState({ ...state, isSaving: false })
}
