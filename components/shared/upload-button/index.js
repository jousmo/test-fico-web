import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function UploadButton({
  children,
  style,
  className = "",
  typeFile = "",
  onChange,
  disabled = false,
  fileList,
  ...props
}) {

  return (
    <Upload
      className={className}
      onChange={info => onChange({ typeFile, ...info})}
      fileList={fileList}
      action="https://assets.dev.jaxitank.com/asset-upload"
    >
      <Button style={style} disabled={disabled}>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}

// action="https://assets.dev.jaxitank.com/asset-upload"