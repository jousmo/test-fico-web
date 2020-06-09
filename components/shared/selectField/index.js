import { Select } from "antd"
import { kebabCase } from "lodash"

export function SelectField({
  options,
  id,
  name,
  disabled = false,
  onChange,
  mode,
  placeholder="Selecciona...",
  defaultValue,
  value,
  ...props
}) {
  const onSelectChange = value => {
    onChange && onChange({
      currentTarget: {
        id: id,
        value: value
      }
    })
  }

  return (
    <Select
      id={id}
      name={name}
      disabled={disabled}
      onChange={onSelectChange}
      placeholder={placeholder}
      mode={mode}
      defaultValue={defaultValue}
      value={value}
      {...props}>
      { options?.map((o, i) =>
        <Select.Option
          key={kebabCase(`${o.value}-${i}`)}
          value={o.value}>
          {o.label}
        </Select.Option>
      ) }
    </Select>
  )
}
