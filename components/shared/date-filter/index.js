import { DatePicker } from "antd"

export function DateFilter({ onFilter, type = "month" }) {
  return (
    <DatePicker
      format="DD/MM/YYYY"
      onChange={onFilter}
      picker={type}
      placeholder="Selecciona..." />
  )
}
