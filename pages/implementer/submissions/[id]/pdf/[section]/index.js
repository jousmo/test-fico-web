import { useRouter } from "next/router"
import {
  GeneralInformationPDF
} from "../../../../../../components/implementer/submissions/pdf"
import {
  ImplementerSubmissionContext
} from "../../../../../../contexts/implementer/submissions/show"
import { submission } from "../../../../../../graphql"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { withApollo } from "../../../../../../helpers/withApollo"

function ViewPDF({ client }) {
  const router = useRouter()
  const [ state ] = useState({
    viewPDF: {}
  })

  const { loading, error, data } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: router.query.id }
  })

  const injectActions = useMemo(() => ({
    loading,
    error,
    data
  }), [state])

  let sectionComponent
  if (router.query.section === "general-information"){
    sectionComponent = <GeneralInformationPDF />
  }

  return (
    <ImplementerSubmissionContext.Provider value={injectActions}>
      {sectionComponent}
    </ImplementerSubmissionContext.Provider>
  )
}

export default withApollo(ViewPDF)
