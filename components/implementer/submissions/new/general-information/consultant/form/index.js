import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ConsultantModal } from "./consultant-modal"
import { ConsultantItem } from "./consultant-item"
import { useState } from "react"

function ConsultantForm({data, onChange}) {
  const [state, setState] = useState({
    isModalOpen: false,
    edit: undefined
  })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
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

  const consultants = data?.Submission?.consultants || []

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={consultants}
          onClickAdd={onClickAdd}
          addLabel="Agregar consultor">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <div>
              <ConsultantModal
                edit={state.edit}
                onSave={onSave(addNew, replaceItemAtIndex)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              { items.map((item, key) =>
                <ConsultantItem
                  key={key}
                  index={key}
                  data={item}
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

export default withForm(ConsultantForm)
