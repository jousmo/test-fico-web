import { Popover, Button } from "antd"
import { UploadButtonForm } from ".."
import { PaperClipOutlined, UploadOutlined } from "@ant-design/icons"
import { toFileList } from "../../../helpers"

export function UploadTooltip({ body, small, title, readOnly, value, ...props }){
  const content = (
    <div style={{width: "300px"}}>
      <p>
        {body}
      </p>
      <UploadButtonForm
        fileList={toFileList(value)}
        disabled={readOnly}
        {...props}>
        Adjuntar documento
      </UploadButtonForm>
    </div>
  )

  let tooltipButton = (
    <Button icon={<UploadOutlined />}>
      Adjuntar
    </Button>
  )

  if (small){
    tooltipButton = (
      <Button
        shape="circle"
        icon={<PaperClipOutlined />} />
    )
  }

  return (
    <Popover
      content={content}
      title={title}
      trigger="click">
      {tooltipButton}
    </Popover>
  )
}
