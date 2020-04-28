import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

export function DownloadButton({children, outlined, style}) {
  if (outlined){
    style = { backgroundColor: "#c68e8f", color: "white", ...style }
  }
  return (
    <Button style={style}>
      <DownloadOutlined /> {children}
    </Button>
  )
}
