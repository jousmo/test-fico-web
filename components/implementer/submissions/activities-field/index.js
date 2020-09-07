import { ActivityItem } from "./activity-item"
import { CompositeField } from "../../../shared"
import { useState } from "react"
import { ActivityModal } from "./activity-modal"

export function ActivitiesField({
  activityType,
  defaultValue,
  objectiveIndex,
  onChange,
  readOnly,
  hiddenComments,
  review
}) {
  const [state, setState] = useState({ isModalOpen: false, edit: undefined })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  const onSave = (addNew, replaceItemAtIndex) => values => {
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

  return (
    <CompositeField
      onChange={onChange}
      defaultValue={defaultValue}
      onClickAdd={onClickAdd}
      isAddDisabled={readOnly || review}
      addLabel="Agregar actividad">
      {({ items, addNew, removeItem, replaceItemAtIndex }) =>
        <div>
          <ActivityModal
            activityType={activityType}
            objectiveIndex={objectiveIndex}
            onCancel={onCancel}
            onSave={onSave(addNew, replaceItemAtIndex)}
            visible={state.isModalOpen}
            edit={state.edit}
            review={review}
            hiddenComments={hiddenComments} />
          { items.map((item, index) =>
            <ActivityItem
              data={item}
              key={`activity_${index}`}
              readOnly={readOnly}
              review={review}
              onDelete={removeItem(index)}
              onEdit={onEdit(item, index)} />
          ) }
        </div>
      }
    </CompositeField>
  )
}
