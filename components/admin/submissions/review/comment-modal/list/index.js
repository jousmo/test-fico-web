import { List, Typography } from "antd"
import moment from "moment"
import {
  statusOptions
} from "../../../../../../helpers/selectOptions/shared/statusOptions"
import {
  getReadableValue
} from "../../../../../../helpers/selectOptions/getReadableValue"

export function CommentListing({ comments }){
  return (
    <List
      header={
        <Typography.Text>Comentarios ({comments.length})</Typography.Text>
      }>
      {comments.map((element, index) =>
        <List.Item key={index}>
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
      )}
    </List>
  )
}
