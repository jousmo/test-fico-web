import { Button } from "antd"
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons"

export function EvaluationActionButtons({ id }){
  return (
    <div>
      <Button
        icon={<EyeOutlined />}
        shape="circle" />
      &nbsp;
      <Button
        icon={<CloseOutlined />}
        shape="circle" />
      &nbsp;
      <Button
        icon={<CheckOutlined />}
        shape="circle"
        style={{ backgroundColor: "green", color: "white" }} />
    </div>
  )
}
