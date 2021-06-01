import { Avatar, Divider, List, Typography, Skeleton, Empty } from "antd"
import moment from "moment"
import { UserOutlined } from "@ant-design/icons"
import { useAuth } from "../../../contexts/auth"
import { DeleteButton } from "../delete-button"
import React from "react"
import { Visibility } from "../visibility"

export function CommentMonitoringListing({ loading, comments = [], onDeleteComment, readOnly }){
  const { user: { claims: { role } } } = useAuth()

  const onDelete = id => {
    onDeleteComment && onDeleteComment(id)
  }

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

          {comments?.map(({ id, userType, createdAt, comment }, index) => {
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  style={{paddingRight: "1.5rem"}}
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
                        ? "Tú - "
                        : role === "ADMIN"
                          ? "IMPLEMENTADORA - "
                          : "FICOSEC - "
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

                <Visibility visible={userType === role && !readOnly}>
                  <DeleteButton
                    type="primary"
                    shape="circle"
                    onClick={() => onDelete(id)}/>
                </Visibility>

              </List.Item>
            )
          })}
        </List>
      )
  )
}
