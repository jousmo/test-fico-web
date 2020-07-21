import { useContext } from "react"
import { Button } from "antd"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons"

export function EvaluationActionButtons({ id }){
  const {
    router
  } = useContext(AdminSubmissionContext)

  const handleView = () => {
    router.push(`/admin/submissions/${id}/review/general-information`)
  }

  return (
    <div>
      <Button
        icon={<EyeOutlined />}
        onClick={handleView}
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
