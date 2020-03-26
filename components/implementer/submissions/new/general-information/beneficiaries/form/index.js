import { withForm } from "../../../../../../../helpers/withForm"
import { Form, Card, Descriptions, Typography } from "antd"
import { CompositeField } from "../../../../../../shared"
import { BeneficiaryModal } from "./beneficiaryModal"
import { BeneficiaryItem } from "./beneficiaryItem"
import { useState } from "react"

function BeneficiariesForm({data, isLoading, onChange, error}) {
  const [state, setState] = useState({ isModalOpen: false })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
  }

  const onSave = (addNew) => (values) => {
    addNew(values)
    onCancel()
  }

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={data?.Submission?.beneficiaries}
          onClickAdd={onClickAdd}
          addLabel="Agregar beneficiario">
          {({ items, addNew, removeItem }) => 
            <div>
              <BeneficiaryModal
                onSave={onSave(addNew)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              { items.map((item, key) => 
                <BeneficiaryItem
                  key={key}
                  data={item}
                  onDelete={() => removeItem(key)} />
              ) }
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}

export default withForm(BeneficiariesForm)
