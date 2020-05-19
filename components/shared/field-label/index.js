import { QuestionCircleFilled } from "@ant-design/icons";
import { Popover } from "antd";
import { CommentButton } from "../../admin/submissions/review";

export function FieldLabel({helpText, children, comentable}) {
  return (
    <Popover
      overlayStyle={!helpText && {display: "none"}}
      content={helpText}>
      {children}&nbsp;
      { helpText ?
        <QuestionCircleFilled />
      : null }
      { comentable ?
        <CommentButton
          name={comentable?.name}
          section={comentable?.section} />
      : null }
    </Popover>
  )
}
