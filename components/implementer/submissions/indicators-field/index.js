import { IndicatorItem } from "./indicator-item"
import { CompositeField } from "../../../shared"
import { useState } from "react"
import { IndicatorModal } from "./indicator-modal"

export function IndicatorsField({defaultValue, onChange}) {
  const [state, setState] = useState({ isModalOpen: false })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  return (
    <CompositeField
      onChange={onChange}
      defaultValue={defaultValue}
      onClickAdd={onClickAdd}
      addLabel="Agregar indicador">
      {({ items, addNew, removeItem }) =>
        <div>
          <IndicatorModal visible={state.isModalOpen} />
          { items.map((item, index) =>
            <IndicatorItem
              data={item}
              key={`indicator_${index}`} />
          ) }
        </div>
      }
    </CompositeField>
  )
}
