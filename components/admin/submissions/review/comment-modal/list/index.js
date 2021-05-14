import { Button, List, Tooltip, Typography } from "antd"
import { CheckOutlined, CheckSquareTwoTone } from "@ant-design/icons"
import moment from "moment"
import {
  submissionStatusOptions
} from "../../../../../../helpers/selectOptions/shared/submission-status"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import { DeleteButton } from "../../../../../shared"

export function CommentListing({ comments, onDelete, onReview, readOnly, revision, reviewed }){
  const reviewedIds = reviewed?.map(el => el.id)
  return (
    <List
      header={
        <Typography.Text>Comentarios ({comments?.length || 0})</Typography.Text>
      }>
      {comments?.map((element, index) => {
        let action = []
        if (element.revision === revision){
          action.push(<DeleteButton onClick={() => onDelete(element, index)}/>)
        }
        return (
          <List.Item key={index} actions={action}>
            <List.Item.Meta
              title={
                <Typography.Text>
                  {element.comment}
                </Typography.Text>
              }
              description={
                <Typography.Text type="secondary">
                  {getReadableValue(submissionStatusOptions, element.revision)} -
                  &nbsp;
                  {moment(element.createdAt).format("DD/MM/YYYY")}
                </Typography.Text>
              } />
            {element.reviewed ? (
              <Tooltip title="Solucionado">
                <CheckSquareTwoTone style={{ fontSize: 22 }} />
              </Tooltip>
            ) : (
              !readOnly && (
                <Tooltip title="¿Marcar como solucionado?">
                  <Button
                    disabled={element.reviewed || reviewedIds.includes(element.id)}
                    icon={<CheckOutlined />}
                    onClick={() => onReview({ id: element.id, reviewed: true })}
                    size="small" />
                </Tooltip>
              )
            )}
          </List.Item>
        )
      })}
    </List>
  )
}
