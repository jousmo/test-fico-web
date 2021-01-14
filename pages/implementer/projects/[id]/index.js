import { Layout } from "../../../../components/shared"
import {
  ProjectClosure,
  ProjectMonitoring,
  ProjectSummary,
  SignedAgreement,
  Calendarization,
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
import { PageContext } from "../../../../contexts/page"
import { AuthCheck } from "../../../../helpers/auth/auth-check"
import { Bugsnag, loadingAlert, success, warning, withApollo } from "../../../../helpers"

function Project({ client, query }) {
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
      warning()
      Bugsnag.notify(new Error(e))
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
      value={{ type: "implementer", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<ProjectSummary type="implementer" />}>
          <Government />
          <GeneralInformation />
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
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(Project)
