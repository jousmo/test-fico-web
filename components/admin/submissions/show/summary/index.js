import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { Button, Col, Descriptions } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import Link from "next/link"
import {
  CloseOutlined,
  RetweetOutlined,
  SelectOutlined,
  UploadOutlined
} from "@ant-design/icons"
import { BreadcrumbHeading } from "../../../../shared/breadcrum-heading"
import { ApprovalModal } from "./approval-modal"
import SummaryBody from "../../../../shared/submission-summary-body"
import "./style.sass"

export function SubmissionSummary() {
  const {
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const [state, setState] = useState({
    isModalOpen: false
  })

  const onClickApprove = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
  }

  const onSave = (values) => {
    /* TODO: Change status of submission */
    onCancel()
  }

  const onRequestReview = () => {
    /* TODO: Request review to implementer */
  }

  const headingButtons = (
    <Col>
      <Button
        ghost
        shape="circle"
        icon={<RetweetOutlined />}
        onClick={onRequestReview} />
      <Button ghost shape="circle" icon={<CloseOutlined />} />
      <Button ghost shape="circle" icon={<SelectOutlined />} />
      <Button
        ghost
        shape="circle"
        icon={<UploadOutlined rotate={90}/>}
        onClick={onClickApprove} />
    </Col>
  )

  const goToSubmission = (
    <Descriptions.Item>
      <Link href={`/admin/submissions/${data?.Submission.id}/`}>
        <a><EyeOutlined /> Ver la solicitud</a>
      </Link>
    </Descriptions.Item>
  )

  return (
    <div className="fico submission summary">
      <ApprovalModal
        onCancel={onCancel}
        onSave={onSave}
        visible={state.isModalOpen} />
      <BreadcrumbHeading
        home={{ label: "Solicitudes", url: "/admin/submissions" }}
        itemsList={[
          {
            label: data?.Submission?.name,
            url: `/admin/submissions/${data?.Submission?.id}`
          }
        ]}
        extra={headingButtons} />
      <SummaryBody
        data={data?.Submission}
        error={error}
        extra={goToSubmission}
        isLoading={loading} />
    </div>
  )
}
