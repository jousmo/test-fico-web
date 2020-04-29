import { withForm } from "../../../../../../helpers/withForm"
import {useState} from "react"
import { Button, Col, Row, Typography } from "antd"
import {
  CloseOutlined,
  RetweetOutlined,
  SelectOutlined,
  UploadOutlined
} from "@ant-design/icons"
import { ApprovalModal } from "./approval-modal"

function SummaryHeading({data}) {
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

  return (
    <Row justify="space-between" align="middle">
      <ApprovalModal
        onCancel={onCancel}
        onSave={onSave}
        visible={state.isModalOpen} />
      <Col>
        <Typography.Text type="secondary">
          Solicitudes / {data?.name}
        </Typography.Text>
      </Col>
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
    </Row>
  )
}

export default withForm(SummaryHeading)
