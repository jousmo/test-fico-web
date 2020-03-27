import { QuestionCircleFilled } from "@ant-design/icons";
import { Popover } from "antd";

export function FieldLabel({helpText, children}) {
  return (
    <div>
      {children}&nbsp;
      <Popover content={helpText}>
        <QuestionCircleFilled />
      </Popover>
    </div>
  )
}
