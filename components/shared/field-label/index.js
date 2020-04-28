import { QuestionCircleFilled } from "@ant-design/icons";
import { Popover } from "antd";

export function FieldLabel({helpText, children}) {
  if(!helpText)
    return <div>{children}</div>

  return (
    <Popover content={helpText}>
      {children}&nbsp;
      <QuestionCircleFilled />
    </Popover>
  )
}
