import { useContext } from "react"
import { Button, Tooltip } from "antd"
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons"
import { ConfirmButton } from "../../../../../shared"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import {
  handleApprove,
  handleReject,
  handleView
} from "./helpers"

export function EvaluationActionButtons({ id, onChange }){
  const {
    save,
    router
  } = useContext(AdminSubmissionContext)

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
        icon={<CloseOutlined />}
        confirmText="Rechazar solicitud"
        onClick={() => handleReject(id, save, onChange)} />
      &nbsp;
      <ConfirmButton
        icon={<CheckOutlined />}
        confirmText="Aprobar solicitud"
        onClick={() => handleApprove(id, router, save, onChange)}
        style={{ backgroundColor: "green", color: "white" }} />
    </div>
  )
}
