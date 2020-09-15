import { Avatar, Divider, List, Typography, Skeleton, Empty } from "antd"
import moment from "moment"
import { UserOutlined } from "@ant-design/icons"
import { getUserStorage } from "../../../helpers"

export function CommentMonitoringListing({ loading, comments = [] }){
  const user = getUserStorage()
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

          {comments?.map(({ userType, createdAt, comment }, index) => {
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    userType === user?.claims?.role
                      ? <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                      : user?.claims?.role === "ADMIN"
                        ? <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>I</Avatar>
                        : <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>F</Avatar>
                  }
                  title={
                    <Typography.Text type="secondary">
                      {userType === user?.claims?.role
                        ? "Tú"
                        : user?.claims?.role === "ADMIN"
                          ? "IMPLEMENTADORA"
                          : "FICOSEC"
                      }
                      <Typography.Text disabled>
                        {moment(createdAt).format("DD MMMM YYYY").toUpperCase()}
                      </Typography.Text>
                    </Typography.Text>
                  }
                  description={
                    <Typography.Text>
                      {comment}
                    </Typography.Text>
                  } />
              </List.Item>
            )
          })}
        </List>
      )
  )
}
