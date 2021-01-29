import { Avatar, Divider, List, Typography, Skeleton, Empty } from "antd"
import moment from "moment"
import { UserOutlined } from "@ant-design/icons"
import { useAuth } from "../../../contexts/auth"

export function CommentMonitoringListing({ loading, comments = [] }){
  const { user: { claims: { role } } } = useAuth()
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
                    userType === role
                      ? <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                      : role === "ADMIN"
                        ? <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>I</Avatar>
                        : <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>F</Avatar>
                  }
                  title={
                    <Typography.Text type="secondary">
                      {userType === role
                        ? "Tú"
                        : role === "ADMIN"
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
