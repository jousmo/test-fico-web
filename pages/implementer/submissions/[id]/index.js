import { Layout, Visibility } from "../../../../components/shared"
import { Alert, Typography } from "antd"
import {
  SubmissionSummary,
  AgreementDocuments
} from "../../../../components/implementer/submissions/show"
import {
  ImplementerSubmissionContext
} from "../../../../contexts/implementer/submissions/show"
import { submission } from "../../../../graphql"
import { useCallback, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { loadingAlert, success, withApollo } from "../../../../helpers"
import { apolloError } from "../../../../helpers/bugsnag/notify"
import { PageContext } from "../../../../contexts/page"
import { AuthCheck } from "../../../../helpers/auth/auth-check"

function Submission({ client, query }) {
  const [state, setState] = useState(undefined)

  const [ updateSubmission ] = useMutation(
    submission.mutations.upsertSubmission, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: submission.queries.getDetails,
          variables: { id: query.id }
        }
      ]
    }
  )

  const { loading, error, data, refetch } = useQuery(submission.queries.getDetails, {
    client: client,
    variables: { id: query.id },
    fetchPolicy: "network-only"
  })

  const { data: validationData } = useQuery(submission.queries.getValidationFields, {
    client: client,
    variables: { id: query.id },
    fetchPolicy: "network-only"
  })

  const save = useCallback(async submissionData => {
    const saving = loadingAlert()
    try {
      await updateSubmission({
        variables: { data: { ...submissionData, id: query.id } }
      })
      success()
    }
    catch (e) {
      apolloError(e)
    }
    saving()
  }, [query.id])

  const injectActions = useMemo(() => ({
    loading,
    error,
    data,
    save,
    client,
    refetch,
    validationData
  }), [loading, data, validationData])

  return (
    <PageContext.Provider
      value={{ type: "implementer", submenu: "submissions" }}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout subheader={<SubmissionSummary state={state} setState={setState} />}>
          <Visibility visible={!!state}>
            <Alert
              message={
                <>
                  <Typography.Title level={4}>Campos faltantes:</Typography.Title>
                  <Typography.Text>{state?.join(", ")}</Typography.Text>
                </>
              }
              type="warning" />
          </Visibility>
          <AgreementDocuments />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(Submission)
