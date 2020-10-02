import { Tooltip as ATooltip } from "antd"

export function Tooltip({ value, length = 12 }){
  if (value.length <= length) {
    return value
  }

  return (
    <ATooltip title={value}>
      {`${value.slice(0, length)}...`}
    </ATooltip>
  )
}
