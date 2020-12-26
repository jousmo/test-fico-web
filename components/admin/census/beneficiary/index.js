import React, { useContext } from "react"
import { PageHeader } from "../../../shared"
import CensusBeneficiaryTabs from "./tabs"
import { AdminSubmissionContext } from "../../../../contexts/admin/submissions/show"

export function CensusBeneficiaryDetail() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const { name, lastName, maidenName } = data?.CensusBeneficiaryById || {}
  const fullName = `${name} ${lastName} ${maidenName}`

  return (
    <section>
      <PageHeader title={fullName} />
      <CensusBeneficiaryTabs
        data={data?.CensusBeneficiaryById}
        error={error}
        isLoading={loading} />
    </section>
  )
}
