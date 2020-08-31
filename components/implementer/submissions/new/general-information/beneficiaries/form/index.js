import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Card, Descriptions, Typography } from "antd"
import { CompositeField } from "../../../../../../shared"
import { BeneficiaryModal } from "./beneficiaryModal"
import { BeneficiaryItem } from "./beneficiaryItem"
import { useState } from "react"

function BeneficiariesForm({data, onChange}) {
  const [state, setState] = useState({
    isModalOpen: false,
    edit: undefined
  })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  const onSave = (addNew, replaceItemAtIndex) => (values) => {
    if(typeof values.index === "undefined") {
      addNew(values)
    }
    else {
      const index = values.index
      delete values.index

      replaceItemAtIndex(index, values)
    }
    onCancel()
  }

  const onEdit = (data, index) => () => {
    data.index = index
    setState({ isModalOpen: true, edit: data })
  }

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={data?.Submission?.beneficiaries}
          onClickAdd={onClickAdd}
          isAddDisabled={readOnly}
          addLabel="Agregar beneficiario">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <div>
              <BeneficiaryModal
                edit={state.edit}
                onSave={onSave(addNew, replaceItemAtIndex)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              { items.map((item, key) =>
                <BeneficiaryItem
                  key={key}
                  index={key}
                  data={item}
                  readOnly={readOnly}
                  onEdit={onEdit(item, key)}
                  onDelete={removeItem(key)} />
              ) }
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}

export default withForm(BeneficiariesForm)
