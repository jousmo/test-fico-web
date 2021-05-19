import { Space } from "antd"
import { submission } from "../../../../../../../graphql"
import { useLazyQuery } from "@apollo/react-hooks"
import { useContext, useEffect } from "react"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"
import { attachmentThree  } from "./helpers"


export function ExtraAttachmentsContent() {
  const { client } = useContext(AdminSubmissionContext)
  const router = useRouter()
  const { query: { id } } = router || {}

  const [getBudget, { data: budget = {} }] = useLazyQuery(submission.queries.getBudget,  {
    client, variables: { id }
  })

  useEffect(async () => {
    if (budget.Budget) {
      await attachmentThree(budget.Budget)
    }
  }, [budget])

  return (
    <Space direction="vertical">
      <a onClick={() => getBudget()}>Anexo 3</a>
      <a onClick={() => getBudget()}>Anexo 4</a>
    </Space>
  )
}
