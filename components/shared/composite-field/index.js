import { useState } from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

export function CompositeField({
  children,
  onChange,
  onClickAdd,
  addLabel
}) {
  const [state, setState] = useState({ items: [] })
  
  const addNew = (value) => {
    const newItems = [...state.items, ...value]
    setState({ items: newItems })
    onChange && onChange(items)
  }

  return (
    <div>
      { children(state.items) }
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
