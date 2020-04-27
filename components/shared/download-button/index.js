import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

export function DownloadButton({children, style}) {
  return (
    <Button style={style}>
      <DownloadOutlined /> {children}
    </Button>
  )
}
