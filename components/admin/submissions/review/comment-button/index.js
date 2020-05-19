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

  return (
    <Button
      size="small"
      shape="round"
      style={{float: "right"}}
      onClick={onClick}
      icon={<PlusCircleOutlined />}>
      Comentar
    </Button>
  )
}
