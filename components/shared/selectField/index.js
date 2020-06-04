import { Select } from "antd"
import { kebabCase } from "lodash"

export function SelectField({
  options,
  id,
  name,
  onChange,
  mode,
  placeholder="Selecciona...",
  defaultValue,
  value
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
      onChange={onSelectChange}
      placeholder={placeholder}
      mode={mode}
      defaultValue={defaultValue}
      value={value}>
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
