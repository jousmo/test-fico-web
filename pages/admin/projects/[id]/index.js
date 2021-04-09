import { Layout } from "../../../../components/shared"
import {
  ProjectClosure,
  ProjectMonitoring,
  ProjectSummary,
  SignedAgreement,
  Calendarization,
  Government,
  Attachments
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
import { PageContext } from "../../../../contexts/page"
import { loadingAlert, success, withApollo } from "../../../../helpers"
import { AuthCheck } from "../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../helpers/bugsnag/notify"

function Project({ client, query }) {
  const [updateSubmission] = useMutation(
    submission.mutations.upsertSubmission, {
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
        variables: { data: { ...submission, id: query.id } }
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
          <Attachments />
          <SignedAgreement />
          <Calendarization />
          <ProjectMonitoring />
          <ProjectClosure />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "ADMIN")
}

export default withApollo(Project)
