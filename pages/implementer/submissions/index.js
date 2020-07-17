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
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../helpers/withApollo"

function ImplementerSubmissions({ client }) {
  const [ state ] = useState({
    submissionsList: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getAll, {
    client: client,
    variables: { state: "SUBMISSION" }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state, loading])

  const newSubmissionButton = (
    <Button type="primary">
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
