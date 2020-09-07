import { IndicatorItem } from "./indicator-item"
import { CompositeField } from "../../../shared"
import { useState } from "react"
import { IndicatorModal } from "./indicator-modal"

export function IndicatorsField({
  defaultValue,
  indicatorType,
  objectiveIndex,
  onChange, readOnly,
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
      addLabel="Agregar indicador">
      {({ items, addNew, removeItem, replaceItemAtIndex }) =>
        <div>
          <IndicatorModal
            indicatorType={indicatorType}
            objectiveIndex={objectiveIndex}
            review={review}
            onCancel={onCancel}
            onSave={onSave(addNew, replaceItemAtIndex)}
            visible={state.isModalOpen}
            edit={state.edit}
            hiddenComments={hiddenComments} />
          { items.map((item, index) =>
            <IndicatorItem
              data={item}
              key={`indicator_${index}`}
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
