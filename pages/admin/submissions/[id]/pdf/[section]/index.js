import { useRouter } from "next/router"
import {
  GeneralInformationPDF,
  ReportsPDF,
  TechnicalSpecificationPDF
} from "../../../../../../components/admin/submissions/pdf"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import { submission, implementer } from "../../../../../../graphql"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"

function ViewPDF({ client }) {
  const router = useRouter()
  const [ state ] = useState({
    viewPDF: {}
  })

  const submissionResult = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
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
  if (router.query.section === "general-information"){
    sectionComponent = <GeneralInformationPDF />
  } else if (router.query.section === "reports"){
    sectionComponent = <ReportsPDF />
  } else if (router.query.section === "technical-specification"){
    sectionComponent = <TechnicalSpecificationPDF />
  }

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      {sectionComponent}
    </AdminSubmissionContext.Provider>
  )
}

export default withApollo(ViewPDF)
