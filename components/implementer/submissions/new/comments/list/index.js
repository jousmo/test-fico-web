import moment from "moment"
import { Skeleton, List, Empty, Divider, Typography } from "antd"
import { DeleteButton, Visibility } from "../../../../../shared"
import { getReadableValue, shared } from "../../../../../../helpers/selectOptions"

export function CommentsList({ comments, loading, onDelete, readOnly }) {
  const { submissionStatusOptions } = shared

  return (
    loading
      ? <Skeleton avatar active paragraph={{ rows: 2 }} />
      : (
        <List
          header={
            comments.length === 0
              ? <Empty description="No hay comentarios aún" />
              : <Divider orientation="left">{`Comentarios ${comments.length}`}</Divider>
          }>
          {comments?.map(({ id, revision, createdAt, comment }) =>
            <List.Item key={id}>
              <List.Item.Meta
                style={{ paddingRight: "1.5rem" }}
                title={
                  <Typography.Text type="secondary">
                    {moment(createdAt).format("DD MMMM YYYY").toUpperCase()}
                    <Typography.Text disabled>
                      {" - "}{getReadableValue(submissionStatusOptions, revision)}
                    </Typography.Text>
                  </Typography.Text>
                }
                description={
                  <Typography.Text>
                    {comment}
                  </Typography.Text>
                } />
              <Visibility visible={readOnly}>
                <DeleteButton
                  type="primary"
                  shape="circle"
                  onClick={() => onDelete(id)}/>
              </Visibility>
            </List.Item>
          )}
        </List>
      )
  )
}
