import { Button, Card, Space } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ListBeneficiaries } from "./list"
import { decoratedData } from "../../../../../../../helpers/assistantsBeneficiaries"
import { ModalBeneficiaries } from "./modal"
import React, { useState } from "react"
import { omit } from "lodash"

export function MonitoringBeneficiaries({ data, dateFilter }) {
  const { Submission } = data || {}
  const dataSource = decoratedData(Submission?.projectBeneficiaries)
  const [selectedRows, setSelectedRows] = useState([])
  const [state, setState] = useState({
    openConfirm: false,
    isModalOpen: false,
    edit: false
  })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, edit: false })
  }

  const onSave = beneficiary => {
    if(beneficiary.index !== undefined) {
      const updateBeneficiary = omit(beneficiary,
        ['index', 'folio', 'age', 'activities', 'times']
      )
      // updateAssistants && updateAssistants(updateAssistant)
    } else {
      // createAssistants && createAssistants(assistant)
    }

    onCancel()
  }

  const onEdit = (item, index) => {
    item.index = index
    setState({ ...state, isModalOpen: true, edit: item })
  }

  const onDelete = ({ id }) => {
    // deleteAssistants && deleteAssistants(id)
  }

  return (
    <Card className="assistants">
      <Space size="middle" style={{marginBottom: "1rem"}}>
        <Button>Agregar asistencia</Button>
        <Button type="primary">Descargar</Button>
      </Space>
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={null}
        value={dataSource}
        addLabel="Agregar beneficiarios"
        orientation="TOP">
        {({ items }) =>
          <>
            <ModalBeneficiaries
              visible={state.isModalOpen}
              onSave={onSave}
              onCancel={onCancel}
              edit={state.edit}
              className="fico modal-assistants"/>
            <ListBeneficiaries
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              dataSource={items}
              onEdit={onEdit}
              onDelete={onDelete}/>
          </>
        }
      </CompositeField>
    </Card>
  )
}
