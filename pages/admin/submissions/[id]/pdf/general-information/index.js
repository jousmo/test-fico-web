import { GeneralInformationPDF } from "../../../../../../components/admin/submissions/pdf"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import { submission } from "../../../../../../graphql"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

function GeneralInfoPDF({ client, query }) {
  const { data } = useQuery(submission.queries.getDetails, {
    client: client,
    variables: { id: query.id }
  })

  const injectActions = useMemo(() => ({ data }), [data])

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      <GeneralInformationPDF />
    </AdminSubmissionContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(GeneralInfoPDF)
