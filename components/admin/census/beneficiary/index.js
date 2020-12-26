import React from "react"
import { PageHeader } from "../../../shared"
import { CensusBeneficiaryTabs } from "./tabs"
import { withForm } from "../../../../helpers"

function CensusBeneficiaryDetail({ data }) {
  const { name, lastName, maidenName } = data?.CensusBeneficiaryById || {}
  const fullName = `${name} ${lastName} ${maidenName}`

  return (
    <section>
      <PageHeader title={fullName} />
      <CensusBeneficiaryTabs data={data?.CensusBeneficiaryById}/>
    </section>
  )
}

export default withForm(CensusBeneficiaryDetail)
