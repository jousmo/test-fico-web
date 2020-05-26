import { CommentsContext } from "./context"
import moment from "moment"
import {
  CommentModal
} from "../../../../../components/admin/submissions/review"
import { useCallback, useState } from "react"
import { onDeleteHelper, onSaveHelper } from "./helpers"

export function CommentsProvider({ children, submission, readOnly, update }) {
  const revision = submission?.status
  const [state, setState] = useState({
    isModalOpen: false, field: {}, comments: []
  })

  const openCommentsModal = useCallback((field) => {
    setState({ ...state, field: field, isModalOpen: true})
  }, [state])

  const commentsFromLocation = (index, section, name) => {
    let comments = []
    if (section === "submission"){
      comments = submission?.comments
    } else if (section === "consultant"){
      comments = submission?.consultant?.comments
    } else if (section === "generalIndicator"){
      comments =
        submission?.generalObjectiveIndicators[index]?.comments
    } else if (section === "developmentIndicator"){
      comments =
        submission?.developmentObjectiveIndicators[index]?.comments
    }
    return comments?.filter(comment => (
      comment.fieldName === name
    ))
  }

  const getCommentsNumber = (field) => {
    const { index, section, name } = field
    return commentsFromLocation(index, section, name)?.length
  }

  const getComments = useCallback(() => {
    const { field } = state
    const comments =
      commentsFromLocation(field.index, field.section, field.name)
    setState({ ...state, comments: comments })
    return comments
  }, [state])

  const onDelete = index => {
    const { section } = state.field

    const newComments =
      onDeleteHelper(state.field.index, section, submission, index, update)
    setState({ ...state, comments: newComments })
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

    const fieldComments = state.comments || []
    const newFieldComments = [
      ...fieldComments,
      newComment
    ]
    setState({...state, comments: newFieldComments})

    onSaveHelper(newComment, state.field.index, section, submission, update)
    return newFieldComments
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
