import { Popover, Button } from "antd"
import { UploadButton } from "../../../../../../shared"
import { PaperClipOutlined } from "@ant-design/icons"

export function ConfirmUpload(){
  const content = (
    <div style={{width: "300px"}}>
      <p>
        Adjunta el CV y el documento que certifica los estudios de esta persona
      </p>
      <UploadButton>Adjuntar documento</UploadButton>
    </div>
  )

  return (
    <Popover
      content={content}
      title="Experiencia y profesión"
      trigger="click">
      <Button
        shape="circle"
        icon={<PaperClipOutlined />} />
    </Popover>
  )
}
