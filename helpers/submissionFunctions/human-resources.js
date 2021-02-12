import { loadingAlert, success } from "../alert"
import { apolloError } from "../bugsnag/notify"

export const setSave = async (humanResources, setState, updateSubmission) => {
  setState(true)
  const saving = loadingAlert()
  try {
    await updateSubmission({
      variables: { data: humanResources }
    })
    saving()
    success()
  }
  catch(err) {
    apolloError(err)
  }
  saving()
  setState(false)
}
