import { QuestionCircleFilled } from "@ant-design/icons";
import { Popover } from "antd";

export function FieldLabel({helpText, children}) {
  return (
    <div>
      {children}
      <Popover content={helpText}>
        <QuestionCircleFilled />
      </Popover>
    </div>
  )
}
