import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function UploadButton({children, style, ...props}) {
  return (
    <Upload>
      <Button style={style} {...props}>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}
