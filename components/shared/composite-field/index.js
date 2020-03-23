import { useState } from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

export function CompositeField({
  children,
  onChange,
  onClickAdd,
  addLabel,
  defaultValue=[],
  maxItems
}) {
  const [state, setState] = useState({
    items: Array.from(defaultValue),
    maxReached: maxItems && (defaultValue.length >= maxItems)
  })

  const handleMaxReached = (items) => {
    if(typeof maxItems !== "undefined") {
      if(items.length >= maxItems) {
        setState({ ...state, maxReached: true })
        return true
      }
      else if(state.maxReached) {
        setState({ ...state, maxReached: false })
        return false
      }
    }
  }
  
  const addNew = value => {
    if(handleMaxReached(state.items)) {
      return
    }
    
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

  const removeItem = index => {
    const newItems = Array.from(state.items).filter((it, i) => i !== index)
    setState({ items: newItems })
    handleMaxReached(newItems)
    onChange && onChange(newItems)
  }

  return (
    <div>
      { children({items: state.items, updateItem, addNew, removeItem}) }
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => onClickAdd && onClickAdd(addNew)}
        disabled={state.maxReached}
        block>
        {addLabel}
      </Button>
    </div>
  )
}
