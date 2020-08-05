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

function ImplementerSubmissions({ client }) {
  const router = useRouter()
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION" }
  })

  const injectActions = useMemo(() => ({
    loading,
    router,
    error,
    data
  }), [state, loading])

  const [createSubmission] = useMutation(
    submission.mutations.createNew, { client: client }
  )

  const handleNewSubmission = async () => {
    //Todo Update implementer id
    const { data } = await createSubmission({
      variables: {
        id: "f3f13a59-337e-4989-b010-d7713a53c3c2",
        data: { state: "SUBMISSION", status: "CREATED" }
      }
    })
    const { CreateSubmission: { id } } = data || {}
    router.push(`/implementer/submissions/${id}/edit/general-information`)
  }

  const newSubmissionButton = (
    <Button onClick={handleNewSubmission} type="primary">
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

export default withApollo(ImplementerSubmissions)
