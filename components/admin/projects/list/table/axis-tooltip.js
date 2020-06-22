import {
  getReadableValue
} from "../../../../../helpers/selectOptions/getReadableValue"
import { Tooltip } from "antd"

export function AxisTooltip({ options, text}){
  const value = getReadableValue(options, text)
  return (
    <Tooltip title={value}>
      {`${value.slice(0, 12)}...`}
    </Tooltip>
  )
}
