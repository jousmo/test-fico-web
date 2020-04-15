import { IndicatorItem } from "./indicator-item"
import { CompositeField } from "../../../shared"
import { useState } from "react"
import { IndicatorModal } from "./indicator-modal"

export function IndicatorsField({defaultValue, onChange}) {
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
    <CompositeField
      onChange={onChange}
      defaultValue={defaultValue}
      onClickAdd={onClickAdd}
      addLabel="Agregar indicador">
      {({ items, addNew, removeItem }) =>
        <div>
          <IndicatorModal
            onCancel={onCancel}
            onSave={onSave(addNew)}
            visible={state.isModalOpen} />
          { items.map((item, index) =>
            <IndicatorItem
              data={item}
              key={`indicator_${item.uuid}`}
              onDelete={removeItem(index)} />
          ) }
        </div>
      }
    </CompositeField>
  )
}
