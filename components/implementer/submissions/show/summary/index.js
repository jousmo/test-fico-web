import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import { Button } from "antd"
import { RightCircleOutlined, SendOutlined } from "@ant-design/icons"
import { BreadcrumbHeading } from "../../../../shared/breadcrum-heading"
import SummaryBody from "../../../../shared/submission-summary-body"
import "./style.sass"

export function SubmissionSummary() {
  const {
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  return (
    <div className="fico submission summary implementer">
      <BreadcrumbHeading />
      <SummaryBody
        data={data?.Submission}
        error={error}
        isLoading={loading} />
      <div className="btn-container">
        <Button
          icon={<RightCircleOutlined />}
          className="implementer continue-submission">
          Continuar solicitud
        </Button>
        <Button
          icon={<SendOutlined />}
          className="implementer send-submission">
          Enviar solicitud
        </Button>
      </div>
    </div>
  )
}
