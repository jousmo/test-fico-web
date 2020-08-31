import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { Descriptions } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import Link from "next/link"
import { BreadcrumbHeading } from "../../../../shared/breadcrum-heading"
import SummaryBody from "../../../../shared/project-summary-body"
import "./style.sass"

export function ProjectSummary({ type }) {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const view = type === "admin" ? "review" : "edit"

  const goToProject = (
    <Descriptions.Item>
      <Link href={`/${type}/submissions/${data?.Submission.id}/${view}/general-information`}>
        <a><EyeOutlined /> Ver la solicitud</a>
      </Link>
    </Descriptions.Item>
  )

  return (
    <div className="fico project summary">
      <BreadcrumbHeading
        home={{ label: "Monitoreo", url: `/${type}/projects` }}
        itemsList={[
          {
            label: data?.Submission?.name,
            url: `/${type}/projects/${data?.Submission?.id}`
          }
        ]} />
      <SummaryBody
        data={data?.Submission}
        error={error}
        extra={goToProject}
        isLoading={loading} />
    </div>
  )
}
