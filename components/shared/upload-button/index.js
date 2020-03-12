import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function UploadButton({children}) {
  return (
    <Upload>
      <Button>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}
