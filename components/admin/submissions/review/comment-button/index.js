import { Button } from "antd"
import { MessageOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { useContext, useEffect, useState } from "react"
import {
  CommentsContext
} from "../../../../../contexts/admin/submissions/review/comments/context"

export function CommentButton({index, name, section, ...props}) {
  const commentsContext = useContext(CommentsContext)

  if(!commentsContext) {
    return null
  }

  const field = {index: index, name: name, section: section}

  const {
    readOnly,
    openCommentsModal,
    getCommentsNumber
  } = commentsContext

  const comments = getCommentsNumber(field)

  const onClick = () => {
    openCommentsModal(field)
  }

  if (comments > 0){
    return (
      <Button
        size="small"
        shape="round"
        style={
          { float: "right",
            backgroundColor: "#d54650",
            color: "white"
          }
        }
        onClick={onClick}
        icon={<MessageOutlined />}>
        {comments}
      </Button>
    )
  }

  if (props.small){
    return (
      <Button
        size="small"
        shape="round"
        onClick={onClick}
        icon={<MessageOutlined />} />
    )
  }

  const buttonText = readOnly ? "Comentarios" : "Comentar"

  return (
    <Button
      size="small"
      shape="round"
      style={{float: "right"}}
      onClick={onClick}
      icon={readOnly ? null : <PlusCircleOutlined />}>
      {buttonText}
    </Button>
  )
}
