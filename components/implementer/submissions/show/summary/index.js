import { useContext } from "react"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import { Button, Row } from "antd"
import Link from "next/link"
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
      <Row justify="end" gutter={10}>
        <Link href="/">
          <a>
            <Button
              icon={<RightCircleOutlined />}
              className="implementer continue-submission">
              Continuar solicitud
            </Button>
          </a>
        </Link>
        <Button
          icon={<SendOutlined />}
          className="implementer send-submission">
          Enviar solicitud
        </Button>
      </Row>
    </div>
  )
}
