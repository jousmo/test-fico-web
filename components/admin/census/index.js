import React, { useContext } from "react"
import { PageHeader } from "../../shared"
import CensusTabs from "./tabs"
import { AdminSubmissionContext } from "../../../contexts/admin/submissions/show"

export function CensusList() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  return (
    <section>
      <PageHeader title="Padrón de beneficiarios y asistentes" />
      <CensusTabs
        data={data?.Census}
        error={error}
        isLoading={loading} />
    </section>
  )
}
