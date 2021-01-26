import { Layout } from "../../../../../components/shared"
import { PageContext } from "../../../../../contexts/page"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import {
  ProjectSchedule
} from "../../../../../components/admin/projects/schedule"
import { submission } from "../../../../../graphql/submission"
import { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { loadingAlert, success, withApollo } from "../../../../../helpers"
import { AuthCheck } from "../../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../../helpers/bugsnag/notify"

function ProjectSchedulePage({ client, query }) {
  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query.id }
  })

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
      apolloError(e)
    }
  }, [updateSubmission])

  const injectActions = useMemo(() => ({
    loading,
    error,
    save,
    data
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "admin", step: "active", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <ProjectSchedule />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(ProjectSchedulePage)
