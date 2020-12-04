import { Card } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ListAssistants } from "./list"
import { decoratedData } from "./list/helper"
import { ModalAssistants } from "./modal"
import React, { useContext, useState } from "react"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"

export function MonitoringAssistants({ data, dateFilter }) {
  const { Submission } = data || {}
  const dataSource = decoratedData(Submission?.assistants)
  const { createAssistants } = useContext(AdminSubmissionContext)

  const [state, setState] = useState({
    isModalOpen: false,
  })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false })
  }

  const onSave = assistant => {
    createAssistants && createAssistants(assistant)
    onCancel()
  }

  return (
    <Card className="assistants">
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={null}
        value={dataSource}
        addLabel="Agregar asistentes"
        orientation="TOP">
        {({ items, addNew, removeItem, replaceItemAtIndex }) =>
          <>
            <ModalAssistants
              visible={state.isModalOpen}
              onSave={onSave}
              onCancel={onCancel}
              className="fico modal-assistants"/>
            <ListAssistants
              dataSource={items}/>
          </>
        }
      </CompositeField>
    </Card>
  )
}
