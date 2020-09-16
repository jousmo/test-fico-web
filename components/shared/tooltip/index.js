import { Tooltip as ATooltip } from "antd"

export function Tooltip({ value, length = 12 }){
  return (
    <ATooltip title={value}>
      {`${value.slice(0, length)}...`}
    </ATooltip>
  )
}
