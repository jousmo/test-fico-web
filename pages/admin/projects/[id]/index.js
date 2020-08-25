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
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../helpers/withApollo"
import { PageContext } from "../../../../contexts/page"
import { loadingAlert, success, warning } from "../../../../helpers/alert"

function Project({ client, query }) {
  const [updateSubmission] = useMutation(
    submission.mutations.updateById, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getById,
          variables: { id: query.id }
        }
      ]
    }
  )

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

  const save = useCallback(async submission => {
    const saving = loadingAlert()

    try {
      await updateSubmission({
        variables: { data: submission, id: query.id }
      })
      success()
      saving()
    }
    catch(e) {
      warning()
      console.error(e)
    }
  }, [updateSubmission])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save
  }), [data, loading])

  return (
    <PageContext.Provider
      value={{ type: "admin", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<ProjectSummary type="admin" />}>
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
