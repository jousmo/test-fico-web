import { Card } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ListAssistants } from "./list"
import { decoratedData } from "./list/helper"
import { ModalAssistants } from "./modal"
import React, { useContext, useState } from "react"
import { omit } from "lodash"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"

export function MonitoringAssistants({ data, dateFilter }) {
  const { Submission } = data || {}
  const dataSource = decoratedData(Submission?.assistants)
  const { createAssistants, updateAssistants, deleteAssistants } = useContext(AdminSubmissionContext)

  const [state, setState] = useState({
    isModalOpen: false,
    edit: false
  })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, edit: false })
  }

  const onSave = assistant => {
    if(assistant.index !== undefined) {
      const updateAssistant = omit(assistant,
        ['index', 'folio', 'age', 'activities', 'times']
      )
      updateAssistants && updateAssistants(updateAssistant)
    } else {
      createAssistants && createAssistants(assistant)
    }

    onCancel()
  }

  const onEdit = (item, index) => {
    item.index = index
    setState({ ...state, isModalOpen: true, edit: item })
  }

  const onDelete = ({ id }) => {
    deleteAssistants && deleteAssistants(id)
  }

  return (
    <Card className="assistants">
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={null}
        value={dataSource}
        addLabel="Agregar asistentes"
        orientation="TOP">
        {({ items }) =>
          <>
            <ModalAssistants
              visible={state.isModalOpen}
              onSave={onSave}
              onCancel={onCancel}
              edit={state.edit}
              className="fico modal-assistants"/>
            <ListAssistants
              dataSource={items}
              onEdit={onEdit}
              onDelete={onDelete}/>
          </>
        }
      </CompositeField>
    </Card>
  )
}
