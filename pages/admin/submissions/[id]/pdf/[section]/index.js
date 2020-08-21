import {
  BudgetPDF,
  GeneralInformationPDF,
  MinistrationsPDF,
  ReportsPDF,
  SchedulePDF,
  TechnicalSpecificationPDF
} from "../../../../../../components/admin/submissions/pdf"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import { submission, implementer } from "../../../../../../graphql"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"

function ViewPDF({ client, query }) {
  const [ state ] = useState({
    viewPDF: {}
  })

  const submissionResult = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const implementerResult = useQuery(implementer.queries.getById, {
    client: client,
    variables: { id: 1 }
  })

  const injectActions = useMemo(() => ({
    implementerResult,
    submissionResult
  }), [state, submissionResult.loading])

  let sectionComponent
  const section = query.section
  if (section === "general-information"){
    sectionComponent = <GeneralInformationPDF />
  } else if (section === "reports"){
    sectionComponent = <ReportsPDF />
  } else if (section === "technical-specification"){
    sectionComponent = <TechnicalSpecificationPDF />
  } else if (section === "budget"){
    sectionComponent = <BudgetPDF />
  } else if (section === "ministrations"){
    sectionComponent = <MinistrationsPDF />
  } else if (section === "schedule"){
    sectionComponent = <SchedulePDF />
  }

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      {sectionComponent}
    </AdminSubmissionContext.Provider>
  )
}

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(ViewPDF)
