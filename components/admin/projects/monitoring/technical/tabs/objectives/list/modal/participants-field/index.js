import { CompositeField } from "../../../../../../../../../shared"
import { useState } from "react"
import { ParticipantsModal } from "./participants-modal"
import { ParticipantsItem } from "./participants-item"

export function ParticipantsField({ defaultValue, onChange, type, readOnly }) {
  const [state, setState] = useState({
    isModalOpen: false
  })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
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

  return (
    <CompositeField
      onChange={onChange}
      defaultValue={defaultValue}
      isAddDisabled={readOnly}
      onClickAdd={onClickAdd}
      addLabel="Agregar participantes">
      {({ items, addNew, removeItem, replaceItemAtIndex }) =>
        <div>
          <ParticipantsModal
            onCancel={onCancel}
            onSave={onSave(addNew, replaceItemAtIndex)}
            visible={state.isModalOpen}
            type={type} />
          { items?.map((item, index) =>
            <ParticipantsItem
              data={item}
              readOnly={readOnly}
              key={`participant_${index}`}
              onDelete={removeItem(index)} />
          ) }
        </div>
      }
    </CompositeField>
  )
}
