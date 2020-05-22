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
    setState({ ...state, field: field, isModalOpen: true})
  }, [state])

  const commentsFromLocation = (section, name) => {
    let comments = []
    if (section === "submission"){
      comments = submission?.comments?.filter(comment => (
        comment.fieldName === name
      ))
    }
    return comments
  }

  const getCommentsNumber = (field) => {
    const { section, name } = field
    return commentsFromLocation(section, name)?.length
  }

  const getComments = useCallback(() => {
    const comments = commentsFromLocation(state.field.section, state.field.name)
    setState({ ...state, comments: comments })
    return comments
  }, [state])

  const onDelete = index => {
    const { section } = state.field
    if (section === "submission"){
      const newComments = [...submission?.comments].filter((e, i) =>
        i !== index
      )
      update({ comments: newComments })
    }
  }

  const onSave = values => {
    const section = state.field.section
    const newComment = {
      fieldName: state.field.name,
      revision: revision,
      comment: values.comment,
      type: section,
      createdAt: moment().format()
    }

    if (section === "submission"){
      const fieldComments = state.comments || []
      const submissionComments = submission?.comments
      const newFieldComments = [
        ...fieldComments,
        newComment
      ]
      const newComments = [
        ...submissionComments,
        newComment
      ]
      setState({...state, comments: newFieldComments})
      update({ comments: newComments })
      return newFieldComments
    }
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false })
  }

  return (
    <CommentsContext.Provider value={{
        revision,
        openCommentsModal,
        getCommentsNumber,
        readOnly
      }}>
      <CommentModal
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
        visible={state.isModalOpen}
        revision={revision}
        readOnly={readOnly}
        getComments={getComments}
        fieldSection={state.field.section}
        fieldName={state.field.name} />
      { children }
    </CommentsContext.Provider>
  )
}
