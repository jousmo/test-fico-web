import { List, Tooltip } from "antd"
import { QuestionCircleFilled } from "@ant-design/icons"
import { UploadButtonForm } from "../../../../shared"

export function FileInputForm({label, helpText, ...props}) {
  return (
    <List.Item
      actions={[
        <UploadButtonForm
          key="UploadButton"
          maxFile={1}
          {...props}>
          Subir documento
        </UploadButtonForm>
      ]}
      style={{borderBottom: 0}}>
      { helpText ?
        <Tooltip title={helpText}>
          {label} <QuestionCircleFilled style={{fontSize: "12px"}} />
        </Tooltip>
        : label }
    </List.Item>
  )
}
