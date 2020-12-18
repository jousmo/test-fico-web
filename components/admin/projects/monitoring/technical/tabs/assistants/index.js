import { Card, Button, Space } from "antd"
import { CompositeField, ConfirmModal } from "../../../../../../shared"
import { ListAssistants } from "./list"
import { decoratedData } from "../../../../../../../helpers/assistantsBeneficiaries"
import { ModalAssistants } from "./modal"
import React, { useContext, useState } from "react"
import { omit } from "lodash"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"

export function MonitoringAssistants({ data, dateFilter }) {
  const { Submission } = data || {}
  const dataSource = decoratedData(Submission?.assistants)
  const {
    createAssistants,
    updateAssistants,
    deleteAssistants,
    createBeneficiaries
  } = useContext(AdminSubmissionContext)
  const [selectedRows, setSelectedRows] = useState([])

  const [state, setState] = useState({
    openConfirm: false,
    isModalOpen: false,
    edit: false
  })

  const onToggleConfirm = () => {
    setState({ ...state, openConfirm: !state.openConfirm })
  }

  const onOk = () => {
    setSelectedRows([])
    createBeneficiaries && createBeneficiaries(selectedRows)
    onToggleConfirm()
  }

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
      <Space size="middle" style={{marginBottom: "1rem"}}>
        <Button>Agregar asistencia</Button>
        <Button onClick={onToggleConfirm}>Convertir a beneficiario</Button>
        <Button type="primary">Descargar</Button>
      </Space>
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
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              dataSource={items}
              onEdit={onEdit}
              onDelete={onDelete}/>
          </>
        }
      </CompositeField>
      <ConfirmModal
        cancelText="Cancelar"
        onCancel={onToggleConfirm}
        onOk={onOk}
        okButtonProps={{ disabled: !selectedRows.length }}
        okText="Crear beneficiarios"
        title="¿Estas seguro de convertir estos asistentes a beneficiarios?"
        visible={state?.openConfirm}/>
    </Card>
  )
}