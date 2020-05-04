import { Section } from "../../../../shared"
import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import StatusBody from "./body"

export function Status() {
  const [ isSaveHidden, setIsSaveHidden] = useState(true)
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const onChange = newLimitDate => {
    setIsSaveHidden(false)
    const newSubmission = {...data?.Submission}
    newSubmission.status.limit = newLimitDate
    updateSubmissionDetail(newSubmission)
  }

  return (
    <Section title="Estatus de solicitud">
      <StatusBody
        data={data?.Submission}
        error={error}
        isLoading={loading}
        isSaveHidden={isSaveHidden}
        onChange={onChange}
        onSave={save} />
    </Section>
  )
}
