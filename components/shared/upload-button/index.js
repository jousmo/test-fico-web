import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export function UploadButton({children, style, typeFile, className, onChange, ...props}) {
  return (
    <Upload
      className={className}
      onChange={info => onChange({typeFile, ...info})}
    >
      <Button style={style} {...props}>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}
