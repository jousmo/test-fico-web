import { Popover, Button } from "antd"
import { UploadButton } from ".."
import { PaperClipOutlined, UploadOutlined } from "@ant-design/icons"

export function UploadTooltip({ body, small, title }){
  const content = (
    <div style={{width: "300px"}}>
      <p>
        {body}
      </p>
      <UploadButton>Adjuntar documento</UploadButton>
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
