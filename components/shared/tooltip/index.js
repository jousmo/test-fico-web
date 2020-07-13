import { Tooltip as ATooltip } from "antd"

export function Tooltip({ value }){
  return (
    <ATooltip title={value}>
      {`${value.slice(0, 12)}...`}
    </ATooltip>
  )
}
