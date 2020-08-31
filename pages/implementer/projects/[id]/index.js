import { Layout } from "../../../../components/shared"
import {
  ProjectClosure,
  ProjectMonitoring,
  ProjectSummary,
  SignedAgreement,
  Government
} from "../../../../components/admin/projects/show"
import {
  GeneralInformation
} from "../../../../components/admin/submissions/show/"
import {
  AdminSubmissionContext
} from "../../../../contexts/admin/submissions/show"
import { submission } from "../../../../graphql/submission"
import { useMemo } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"
import { PageContext } from "../../../../contexts/page"

function Project({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [loading])

  return (
    <PageContext.Provider
      value={{ type: "implementer", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<ProjectSummary type="implementer" />}>
          <Government />
          <GeneralInformation />
          <SignedAgreement />
          <ProjectMonitoring />
          <ProjectClosure />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps({ query }){
  return {
    props: { query }
  }
}

export default withApollo(Project)
