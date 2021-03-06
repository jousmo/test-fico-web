import { Card, Table } from "antd"
import { useContext, useState } from "react"
import { CompositeField, DeleteButton } from "../../../../../../shared"
import {
  AdminSubmissionContext
} from "../../../../../../../contexts/admin/submissions/show"
import { BankStatementsModal } from "./modal"

export function BankStatements(){
  const { data, addBankStatements, deleteBankStatements } = useContext(AdminSubmissionContext)

  const documents = data?.Submission?.documents?.filter(doc => doc.type === "BANK_STATEMENT")

  const [state, setState] = useState(false)

  const onClickAdd = () => {
    setState(true)
  }

  const onCancel = () => {
    setState(false)
  }

  const onSave = document => {
    addBankStatements(document)
    onCancel()
  }

  return (
    <Card className="bank-statements">
      <CompositeField
        value={documents}
        onChange={null}
        isAddDisabled={!addBankStatements}
        onClickAdd={onClickAdd}
        orientation="TOP"
        addLabel="Agregar archivo">
        {({ items }) =>
          <div>
            <BankStatementsModal
              onCancel={onCancel}
              onSave={onSave}
              visible={state} />
            <Table dataSource={items} rowKey={({ url }) => url} pagination={false}>
              <Table.Column
                render={row => <a href={row.url}>{row.name}</a>}
                title="Estado de cuenta" />
              <Table.Column
                render={row =>
                  <DeleteButton onClick={() => deleteBankStatements(row.id)} />
                } />
            </Table>
          </div>
        }
      </CompositeField>
    </Card>
  )
}
