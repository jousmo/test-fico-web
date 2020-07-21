import { useState } from "react"
import { withForm } from "../../../../../helpers/withForm"
import Link from "next/link"
import { List } from "antd"
import { EvaluationActionButtons } from "./action-buttons"

function EvaluationTable({ data }) {
  const [state, setState] = useState({ submissions: data })

  const onChange = id => {
    const newSubmissions = [...state.submissions].filter(e => e.id !== id)
    setState({ submissions: newSubmissions })
  }

  return (
    <List bordered>
      {state.submissions.map(({ id, name }) => (
        <List.Item key={id}>
          <Link href={`/admin/submissions/${id}`}>
            <a>{name}</a>
          </Link>
          <EvaluationActionButtons id={id} onChange={onChange} />
        </List.Item>
      ))}
    </List>
  )
}

export default withForm(EvaluationTable)
