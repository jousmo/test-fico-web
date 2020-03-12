import { useState } from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

export function CompositeField({
  children,
  onChange,
  onClickAdd,
  addLabel,
  defaultValue=[]
}) {
  const [state, setState] = useState({ items: Array.from(defaultValue) })
  
  const addNew = value => {
    const newItems = [...state.items, value]
    setState({ items: newItems })
    onChange && onChange(newItems)
  }

  const updateItem = index => {
    return event => {
      const value = event.currentTarget?.value || event.target?.checked
      const name = event.currentTarget?.id || event.target?.name
      const newItems = Array.from(state.items)
      newItems[index][name] = value

      setState({ items: newItems })
      onChange && onChange(newItems)
    }
  }

  return (
    <div>
      { children({items: state.items, updateItem: updateItem }) }
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => onClickAdd && onClickAdd(addNew)}
        block>
        {addLabel}
      </Button>
    </div>
  )
}
