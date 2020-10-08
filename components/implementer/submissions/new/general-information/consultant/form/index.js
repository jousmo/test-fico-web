import { withForm } from "../../../../../../../helpers/withForm"
import { Form } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ConsultantModal } from "./consultant-modal"
import { ConsultantItem } from "./consultant-item"
import { useState } from "react"

function ConsultantForm({ data, onChange, hiddenComments, review }) {
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

  const readOnly = data?.Submission?.state === "PROJECT"

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={consultants}
          onClickAdd={onClickAdd}
          isAddDisabled={readOnly || review}
          addLabel="Agregar consultor">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <div>
              <ConsultantModal
                edit={state.edit}
                review={review}
                limitDates={[data?.Submission?.startDate, data?.Submission?.endDate]}
                onSave={onSave(addNew, replaceItemAtIndex)}
                visible={state.isModalOpen}
                onCancel={onCancel}
                hiddenComments={hiddenComments}/>
              { items.map((item, key) =>
                <ConsultantItem
                  key={key}
                  index={key}
                  data={item}
                  readOnly={readOnly}
                  review={review}
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
