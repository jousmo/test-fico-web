import { CommentsContext } from "./context"
import moment from "moment"
import {
  CommentModal
} from "../../../../../components/admin/submissions/review"
import { useCallback, useState } from "react"

export function CommentsProvider({ children, submission, readOnly, update }) {
  const revision = submission?.status
  const [state, setState] = useState({
    isModalOpen: false, field: {}, comments: []
  })

  const openCommentsModal = useCallback((field) => {
    const newComments = getComments(field)
    setState({ field: field, isModalOpen: true, comments: newComments})
  }, [state])

  const getCommentsNumber = (field) => {
    return getComments(field).length
  }

  const getComments = (field) => {
    const { section, name } = field
    let comments = []
    if (section === "submission"){
      comments = submission?.comments?.filter(comment => (
        comment.type === section && comment.fieldName === name
      ))
    }
    return comments
  }

  const setField = field => {
    setState({ ...state, field: field })
  }

  const onSave = values => {
    const section = state.field.section
    if (section === "submission"){
      const comments = state.comments || []
      const newComments = [
        ...comments,
        {
          fieldName: state.field.name,
          revision: revision,
          comment: values.comment,
          type: section,
          createdAt: moment().format()
        }
      ]
      setState({...state, comments: newComments})
      update({ comments: newComments })
    }
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false })
  }

  return (
    <CommentsContext.Provider value={{
        revision,
        openCommentsModal,
        setField,
        getCommentsNumber,
        readOnly
      }}>
      <CommentModal
        onSave={onSave}
        onCancel={onCancel}
        visible={state.isModalOpen}
        revision={revision}
        readOnly={readOnly}
        comments={state.comments}
        fieldSection={state.field.section}
        fieldName={state.field.name} />
      { children }
    </CommentsContext.Provider>
  )
}
