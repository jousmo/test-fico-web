import { List, Tooltip } from "antd"
import { LinkOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { UploadButton } from "../../../../shared";

export function FileInput({label, helpText}) {
  return (
    <List.Item actions={[<UploadButton>Subir documento</UploadButton>]}>
      { helpText ?
        <Tooltip title={helpText}>
          {label} <QuestionCircleFilled style={{fontSize: "12px"}} />
        </Tooltip>
      : label }
    </List.Item>
  )
}
