import { Card, Button, Space } from "antd"
import { CompositeField, ConfirmModal, SearchFieldPrimary, Visibility } from "../../../../../../shared"
import { ListAssistants } from "./list"
import { decoratedData } from "../../../../../../../helpers/assistantsBeneficiaries"
import { ModalAssistants } from "./modal"
import { AssistanceModal } from "./assistance"
import React, { useContext, useState } from "react"
import { omit } from "lodash"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"
import { onSearch } from "../../../../../census/tabs/card/helpers"
import { warning } from "../../../../../../../helpers"
import { getAssistance } from "./assistance/helpers"

export function MonitoringAssistants({ data, dateFilter }) {
  const { Submission } = data || {}
  const dataSource = decoratedData(Submission?.assistants, dateFilter)
  const {
    createAssistants,
    updateAssistants,
    deleteAssistants,
    createAssistance,
    createBeneficiaries
  } = useContext(AdminSubmissionContext)
  const [selected, setSelected] = useState({ rows: [], keys: [] })

  const [state, setState] = useState({
    openConfirm: false,
    isModalOpen: false,
    edit: false
  })
  const [assistants, setAssistants] = useState(undefined)
  const [assistance, setAssistance] = useState(undefined)

  const onToggleConfirm = () => {
    setState({ ...state, openConfirm: !state.openConfirm })
  }

  const onOk = () => {
    createBeneficiaries && createBeneficiaries(selected.rows)
    setSelected({ rows: [], keys: [] })
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

  const onAssistance = () => {
    if (!selected.rows.length) {
      warning("Es necesario elegir al menos un asistente...")
      return
    }
    setAssistance(true)
  }

  const onRegisterAssistance = values => {
    createAssistance && createAssistance(getAssistance(values, selected.rows))
    setAssistance(false)
    setSelected({ rows: [], keys: [] })
  }

  return (
    <>
      <SearchFieldPrimary
        onSearch={value => onSearch(dataSource, setAssistants, value)}
        style={{ marginBottom: "1rem" }}  />
      <Card className="assistants">
        <Space size="middle" style={{ marginBottom: "1rem" }}>
          <Button onClick={onAssistance}>Agregar asistencia</Button>
          <Button onClick={onToggleConfirm}>Convertir a beneficiario</Button>
          <Button type="primary">Descargar</Button>
        </Space>
        <CompositeField
          onClickAdd={onClickAdd}
          onChange={null}
          value={assistants ? assistants : dataSource}
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
                selected={selected}
                setSelected={setSelected}
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
          okButtonProps={{ disabled: !selected.rows.length }}
          okText="Crear beneficiarios"
          title="¿Estas seguro de convertir estos asistentes a beneficiarios?"
          visible={state?.openConfirm}/>
        <Visibility visible={assistance}>
          <AssistanceModal
            visible={assistance}
            onSave={onRegisterAssistance}
            onCancel={() => setAssistance(undefined)}
            submission={data?.Submission} />
        </Visibility>
      </Card>
    </>
  )
}
