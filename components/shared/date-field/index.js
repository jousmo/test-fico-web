import { DatePicker } from "antd"
import moment from "moment"

export function DateField({
  id,
  name,
  onChange,
  placeholder="Selecciona fecha...",
  defaultValue,
  fullWidth,
  value
}) {
  const onDateChange = value => {
    onChange && onChange({
      currentTarget: {
        id: id,
        value: value?.format()
      }
    })
  }

  return (
    <DatePicker
      id={id}
      name={name}
      style={fullWidth && {width: "100%"}}
      defaultValue={defaultValue && moment(defaultValue)}
      placeholder={placeholder}
      onChange={onDateChange}
      value={value && moment(value)} />
  )
}
