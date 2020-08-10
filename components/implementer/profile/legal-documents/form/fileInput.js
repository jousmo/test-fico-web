import { List, Tooltip } from "antd"
import { QuestionCircleFilled } from "@ant-design/icons";
import { UploadButton } from "../../../../shared";

export function FileInput({label, helpText, ...props}) {
  return (
    <List.Item actions={[<UploadButton {...props}>Subir documento</UploadButton>]} style={{borderBottom: 0}}>
      { helpText ?
        <Tooltip title={helpText}>
          {label} <QuestionCircleFilled style={{fontSize: "12px"}} />
        </Tooltip>
      : label }
    </List.Item>
  )
}
