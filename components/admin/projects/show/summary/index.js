import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { Button, Col, Descriptions } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import Link from "next/link"
import {
  DownloadOutlined,
} from "@ant-design/icons"
import { BreadcrumbHeading } from "../../../../shared/breadcrum-heading"
import SummaryBody from "../../../../shared/project-summary-body"
import "./style.sass"

export function ProjectSummary() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const headingButtons = (
    <Col>
      <Button ghost shape="circle" icon={<DownloadOutlined />} />
      <Button className="end-button">Concluir proyecto</Button>
    </Col>
  )

  const goToProject = (
    <Descriptions.Item>
      <Link href={`/admin/projects/${data?.Submission.id}/`}>
        <a><EyeOutlined /> Ver la solicitud</a>
      </Link>
    </Descriptions.Item>
  )

  return (
    <div className="fico project summary">
      <BreadcrumbHeading
        home={{ label: "Monitoreo", url: "/admin/projects" }}
        itemsList={[
          {
            label: data?.Submission?.name,
            url: `/admin/projects/${data?.Submission?.id}`
          }
        ]}
        extra={headingButtons} />
      <SummaryBody
        data={data?.Submission}
        error={error}
        extra={goToProject}
        isLoading={loading} />
    </div>
  )
}
