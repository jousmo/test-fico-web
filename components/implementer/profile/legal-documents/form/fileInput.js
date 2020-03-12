import { List } from "antd"
import { LinkOutlined } from "@ant-design/icons";
import { UploadButton } from "../../../../shared";

export function FileInput({label}) {
  return (
    <List.Item actions={[<UploadButton>Subir documento</UploadButton>]}>
      {label}
    </List.Item>
  )
}
