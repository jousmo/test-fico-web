import { Button, Card, Space } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ListBeneficiaries } from "./list"
import { decoratedData } from "../../../../../../../helpers/assistantsBeneficiaries"
import { ModalBeneficiaries } from "./modal"
import React, { useContext, useState } from "react"
import { omit } from "lodash"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"

export function MonitoringBeneficiaries({ data, dateFilter }) {
  const { Submission } = data || {}
  const dataSource = decoratedData(Submission?.projectBeneficiaries)
  const [selectedRows, setSelectedRows] = useState([])
  const [state, setState] = useState({
    openConfirm: false,
    isModalOpen: false,
    edit: false
  })
  const { createBeneficiaries, updateBeneficiaries, deleteBeneficiaries } = useContext(AdminSubmissionContext)

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
      updateBeneficiaries && updateBeneficiaries(updateBeneficiary)
    } else {
      createBeneficiaries && createBeneficiaries(beneficiary, false)
    }

    onCancel()
  }

  const onEdit = (item, index) => {
    item.index = index
    setState({ ...state, isModalOpen: true, edit: item })
  }

  const onDelete = ({ id, projectAssistantId = null }) => {
    deleteBeneficiaries && deleteBeneficiaries(id, projectAssistantId)
  }

  return (
    <Card className="assistants">
      <Space size="middle" style={{marginBottom: "1rem"}}>
        <Button>Relacionar a objetivo especifico</Button>
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
