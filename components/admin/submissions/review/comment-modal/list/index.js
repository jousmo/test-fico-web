import { List, Typography } from "antd"
import moment from "moment"
import {
  statusOptions
} from "../../../../../../helpers/selectOptions/shared/statusOptions"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"
import { DeleteButton } from "../../../../../shared/delete-button"

export function CommentListing({ comments, onDelete, revision }){
  return (
    <List
      header={
        <Typography.Text>Comentarios ({comments?.length || 0})</Typography.Text>
      }>
      {comments?.map((element, index) => {
        let action = []
        if (element.revision === revision){
          action.push(<DeleteButton onClick={() => onDelete(index)}/>)
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
                  {getReadableValue(statusOptions, element.revision)} -
                  &nbsp;
                  {moment(element.createdAt).format("DD/MM/YYYY HH:MM")}
                </Typography.Text>
              } />
          </List.Item>
        )
      })}
    </List>
  )
}
