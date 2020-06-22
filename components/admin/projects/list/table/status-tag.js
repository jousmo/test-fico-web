import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from "@ant-design/icons"
import { Tag } from "antd"
import {
  getReadableValue
} from "../../../../../helpers/selectOptions/getReadableValue"

export function StatusTag({ options, value }){

  const tagSetting = {}

  switch (value) {
    case "AWAITING_INFO": {
      tagSetting.color = "cyan"
      tagSetting.icon = <ClockCircleOutlined />
      break
    }
    case "INFO_SENT": {
      tagSetting.color = "magenta"
      tagSetting.icon = <CheckCircleOutlined />
      break
    }
    case "ON_MONITORING": {
      tagSetting.color = "blue"
      tagSetting.icon = <SyncOutlined />
      break
    }
    case "OBSERVATIONS_SENT": {
      tagSetting.color = "purple"
      tagSetting.icon = <ClockCircleOutlined />
      break
    }
    case "OBSERVATIONS_REPLIED": {
      tagSetting.color = "green"
      tagSetting.icon = <CheckCircleOutlined />
      break
    }
    case "ON_EVALUATION": {
      tagSetting.color = "orange"
      tagSetting.icon = <ClockCircleOutlined />
      break
    }
    case "ON_CLOSURE": {
      tagSetting.color = "red"
      tagSetting.icon = <CloseCircleOutlined />
      break
    }
    default:
      break
  }
  return (
    <Tag color={tagSetting.color}>
      {tagSetting.icon}&nbsp;{getReadableValue(options, value)}
    </Tag>
  )
}
