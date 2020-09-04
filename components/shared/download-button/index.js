import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

export function DownloadButton({children, outlined, style, ...props}) {
  if (outlined){
    style = { backgroundColor: "#c68e8f", color: "white", ...style }
  }
  return (
    <Button style={style} {...props}>
      <DownloadOutlined /> {children}
    </Button>
  )
}
