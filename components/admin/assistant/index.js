import React from "react"
import { PageHeader } from "../../shared"
import { CensusAssistantTabs } from "./tabs"
import { withForm } from "../../../helpers"

function CensusAssistantDetail({ data }) {
  const { name, lastName, maidenName } = data?.CensusAssistantById || {}
  const fullName = `${name} ${lastName} ${maidenName}`

  return (
    <section>
      <PageHeader title={fullName} />
      <CensusAssistantTabs data={data?.CensusAssistantById}/>
    </section>
  )
}

export default withForm(CensusAssistantDetail)
