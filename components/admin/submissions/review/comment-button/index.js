import { Button } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useContext, useEffect, useState } from "react"
import {
  CommentsContext
} from "../../../../../contexts/admin/submissions/review/comments/context"

export function CommentButton({name, section}) {
  const [state, setState] = useState({ commentsNumber: 0 })

  const commentsContext = useContext(CommentsContext)

  if(!commentsContext) {
    return null
  }

  const {
    openCommentsModal,
    setField,
    readOnly,
    getCommentsNumber
  } = commentsContext

  useEffect(() => {
    setField({name: name, section: section})
    /* implement getCommentsNumber to get the result and assign to the state
     * to print the comments number */

     /* setState({ commentsNumber: getCommentsNumber() }) */
  }, [name, section])

  const onClick = () => {
    openCommentsModal()
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
