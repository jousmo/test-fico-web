import { ProjectPDF } from "../../../../../components/admin/projects/pdf"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { submission } from "../../../../../graphql"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../helpers/withApollo"

function ViewPDF({ client, query }) {
  const { data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const injectActions = useMemo(() => ({
    data
  }), [data])

  return (
    <AdminSubmissionContext.Provider value={injectActions}>
      <ProjectPDF />
    </AdminSubmissionContext.Provider>
  )
}

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(ViewPDF)
