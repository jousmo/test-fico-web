import { DatePicker } from "antd"
import moment from "moment"

export function DateField({
  id,
  name,
  onChange,
  placeholder="Selecciona fecha...",
  defaultValue,
  fullWidth,
  value,
  range,
  ...props
}) {
  const onDateChange = value => {
    if(value?.length > 0) {
      value = value?.map(v => v.format("YYYYMM[01]"))
    }
    else {
      value = value?.format()
    }

    onChange && onChange({
      currentTarget: {
        id: id,
        value: value
      }
    })
  }

  if(range) {
    return (
      <DatePicker.RangePicker
        id={id}
        name={name}
        style={fullWidth && {width: "100%"}}
        defaultValue={defaultValue && defaultValue?.map(v => moment(v))}
        placeholder={placeholder}
        onChange={onDateChange}
        value={value && value?.map(v => moment(v))}
        {...props} />
    )
  }

  return (
    <DatePicker
      id={id}
      name={name}
      style={fullWidth && {width: "100%"}}
      defaultValue={defaultValue && moment(defaultValue)}
      placeholder={placeholder}
      onChange={onDateChange}
      value={value && moment(value)}
      {...props} />
  )
}
