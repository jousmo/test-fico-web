import { Popover, Button } from "antd"
import { UploadButtonForm } from ".."
import { PaperClipOutlined, UploadOutlined } from "@ant-design/icons"

export function UploadTooltip({ body, small, title, readOnly, ...props }){
  const content = (
    <div style={{width: "300px"}}>
      <p>
        {body}
      </p>
      <UploadButtonForm disabled={readOnly} {...props}>
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
