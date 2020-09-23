import { useRouter } from "next/router"
import { Layout } from "../../../components/shared"
import { Button } from "antd"
import {
  SubmissionsListing
} from "../../../components/implementer/submissions/list"
import {
  ImplementerSubmissionContext
} from "../../../contexts/implementer/submissions/show"
import { PageContext } from "../../../contexts/page"
import { submission } from "../../../graphql/submission"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"
import { AuthCheck } from "../../../helpers/auth/auth-check"

function ImplementerSubmissions({ client }) {
  const router = useRouter()
  const [ state, setState ] = useState({ isLoading: false })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION" }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

  const [createSubmission] = useMutation(
    submission.mutations.createNew, { client: client }
  )

  const handleNewSubmission = async () => {
    setState({ isLoading: true })
    const { data } = await createSubmission({
      variables: { data: { state: "SUBMISSION", status: "CREATED" } }
    })
    const { CreateSubmission: { id } } = data || {}
    await router.push(`/implementer/submissions/${id}/edit/general-information`)
  }

  const newSubmissionButton = (
    <Button
      disabled={state.isLoading}
      onClick={handleNewSubmission}
      type="primary">
      Nueva solicitud
    </Button>
  )

  return (
    <PageContext.Provider
      value={{
        type: "implementer",
        step: "submissions",
        submenu: "submissions",
        title: "Solicitudes",
        actions: newSubmissionButton
      }}>
      <ImplementerSubmissionContext.Provider value={injectActions}>
        <Layout>
          <SubmissionsListing />
        </Layout>
      </ImplementerSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(ImplementerSubmissions)
