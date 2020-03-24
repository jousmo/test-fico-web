import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function UploadButton({children, style}) {
  return (
    <Upload>
      <Button style={style}>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}
