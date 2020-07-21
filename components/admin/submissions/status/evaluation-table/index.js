import { withForm } from "../../../../../helpers/withForm"
import Link from "next/link"
import { List } from "antd"
import { EvaluationActionButtons } from "./action-buttons"

function EvaluationTable({ data }) {
  return (
    <List bordered>
      {data?.map(({ id, name }) => (
        <List.Item>
          <Link href={`/admin/submissions/${id}`}>
            <a>{name}</a>
          </Link>
          <EvaluationActionButtons id={id} />
        </List.Item>
      ))}
    </List>
  )
}

export default withForm(EvaluationTable)
