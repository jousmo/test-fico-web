import { Radio } from "antd"
import { kebabCase } from "lodash"

export function RadioField({
  options,
  id,
  name,
  onChange,
  defaultValue,
  ...props
}) {
  const onRadioGroupChange = ({ target: { value } }) => {
    onChange && onChange({
      currentTarget: {
        id: id,
        value: value
      }
    })
  }

  return (
    <Radio.Group
      id={id}
      name={name}
      onChange={onRadioGroupChange}
      defaultValue={defaultValue}
      options={options}
      { ...props } />
  )
}
