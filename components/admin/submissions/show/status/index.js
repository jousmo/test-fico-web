import { Section } from "../../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import StatusForm from "./form"

export function Status() {
  const [ isSaveHidden, setIsSaveHidden] = useState(true)
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const onChange = newDeadline => {
    setIsSaveHidden(false)
    const newSubmission = {...data?.Submission}
    newSubmission.deadline = newDeadline
    updateSubmissionDetail(newSubmission)
  }

  return (
    <Section title="Estatus de solicitud">
      <StatusForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        isSaveHidden={isSaveHidden}
        onChange={onChange}
        onSave={save} />
    </Section>
  )
}
