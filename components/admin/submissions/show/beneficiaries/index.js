import { Section } from "../../../../../components/shared"
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import Beneficiary from "./beneficiary"


export function Beneficiaries() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const beneficiaries = data?.SubmissionDetails?.beneficiaries

  return (
    <Section title="Beneficiarios">
      { beneficiaries?.map((beneficiary, key) => (
        <Beneficiary
          key={key}
          data={beneficiary}
          error={error}
          isLoading={loading} />
      )) }
    </Section>
  )
}
