import { Button, Tooltip } from "antd"
import { useRouter } from "next/router"
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons"
import { ConfirmButton } from "../../../../../shared"
import {
  handleApprove,
  handleReject,
  handleView
} from "./helpers"

export function EvaluationActionButtons({ id, save, readOnly }){
  const router = useRouter()

  return (
    <div>
      <Tooltip title="Ver solicitud">
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleView(id, router)}
          shape="circle" />
      </Tooltip>
      &nbsp;
      <ConfirmButton
        disabled={readOnly}
        icon={<CloseOutlined />}
        confirmText="Rechazar solicitud"
        onClick={() => handleReject(id, save)} />
      &nbsp;
      <ConfirmButton
        disabled={readOnly}
        icon={<CheckOutlined />}
        confirmText="Aprobar solicitud"
        onClick={() => handleApprove(id, router, save)}
        style={{ backgroundColor: "green", color: "white" }} />
    </div>
  )
}
