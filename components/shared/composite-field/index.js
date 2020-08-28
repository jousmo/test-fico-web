import { useState, useEffect } from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

export function CompositeField({
  children,
  onChange,
  onClickAdd,
  addLabel,
  defaultValue=[],
  value,
  maxItems,
  isAddDisabled=false,
  orientation="BOTTOM"
}) {
  const [state, setState] = useState({
    items: Array.from(defaultValue),
    maxReached: maxItems && (defaultValue.length >= maxItems)
  })

  useEffect(() => {
    if(value) {
      setState({ ...state, items: Array.from(value) })
    }
  }, [value])

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

  const isMaxReached = (count) => {
    if(typeof maxItems === "undefined") {
      return false
    }

    return count >= maxItems;
  }

  const addNew = value => {
    const newItems = [...state.items, value]

    setState({ items: newItems, maxReached: isMaxReached(newItems.length) })
    handleChange(newItems)
  }

  const updateItem = index => {
    return event => {
      const value = event.currentTarget?.value || event.target?.value
      const name = event.currentTarget?.id || event.target?.name
      const newItems = Array.from(state.items)
      newItems[index][name] = value

      setState({ ...state, items: newItems })
      handleChange(newItems)
    }
  }

  const onFilesChange = (index, documents, name) => {
    const newItems = Array.from(state.items)
    newItems[index][name] = documents

    setState({ ...state, items: newItems })
    handleChange(newItems)
  }

  const replaceItemAtIndex = (index, data) => {
    const newItems = Array.from(state.items)
    newItems[index] = data
    setState({ ...state, items: newItems })
    handleChange(newItems)
  }

  const removeItem = index => {
    return event => {
      const newItems = Array.from(state.items).filter((it, i) => i !== index)
      setState({ items: newItems, maxReached: isMaxReached(newItems.length) })
      handleChange(newItems)
    }
  }

  const handleChange = items => {
    onChange && onChange(items)
  }

  const renderButtonDashed = () => (
    <Button
      type="dashed"
      icon={<PlusOutlined />}
      onClick={() => onClickAdd && onClickAdd(addNew)}
      disabled={state.maxReached}
      block>
      {addLabel}
    </Button>
  )

  return (
    <div>
      { orientation === "TOP" && ( !isAddDisabled && renderButtonDashed() ) }

      {
        children({
          items: state.items,
          onFilesChange,
          updateItem,
          addNew,
          removeItem,
          replaceItemAtIndex
        })
      }

      { orientation === "BOTTOM" && ( !isAddDisabled && renderButtonDashed() ) }
    </div>
  )
}
