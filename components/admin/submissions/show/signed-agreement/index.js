import { Section } from "../../../../shared"
import { useContext, useState, useEffect } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import SubmissionAgreementForm from "./form"

export function SignedAgreement() {
  const {
    updateSubmissionDetail,
    save,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const [state, setState] = useState({
    hasSignedContract: undefined
  })

  useEffect(() => {
    setState({ hasSignedContract: data?.Submission?.signedContractAt })
  }, [data])

  const onChange = ({ target: { name, value } }) => {
    updateSubmissionDetail({ [name]: value })
  }

  const handleSave = async () => {
    await save()
    setState({ hasSignedContract: true })
  }

  return (
    <Section title="Convenio firmado">
      <SubmissionAgreementForm
        data={data?.Submission}
        error={error}
        isLoading={loading}
        hasContract={state.hasSignedContract}
        onChange={onChange}
        onSave={handleSave} />
    </Section>
  )
}
