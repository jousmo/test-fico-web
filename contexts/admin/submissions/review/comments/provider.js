import { CommentsContext } from "./context"
import moment from "moment"
import {
  CommentModal
} from "../../../../../components/admin/submissions/review"
import { useCallback, useState } from "react"
import { getCommentsHelper, onDeleteHelper, onSaveHelper } from "./helpers"

export function CommentsProvider({ children, submission, readOnly, update }) {
  const revision = submission?.status
  const [state, setState] = useState({
    isModalOpen: false, field: {}, comments: [], submission: submission
  })

  const openCommentsModal = useCallback((field) => {
    setState({ ...state, field: field, isModalOpen: true})
  }, [state])

  const getCommentsNumber = (field) => {
    const { index, section, name } = field
    return getCommentsHelper(index, name, section, submission)?.length
  }

  const getComments = useCallback(() => {
    const { field, submission } = state
    const comments =
      getCommentsHelper(field.index, field.name, field.section, submission)
    setState({ ...state, comments: comments })
    return comments
  }, [state])

  const onDelete = index => {
    const { section } = state.field

    const newComments =
      onDeleteHelper(state.field.index, section, submission, index, update)
    setState({ ...state, comments: newComments })
  }

  const onSave = useCallback(values => {
    const { field } = state
    const newComment = {
      fieldName: field.name,
      revision: revision,
      comment: values.comment,
      type: field.section,
      createdAt: moment().format()
    }

    const fieldComments = state.comments || []
    const newFieldComments = [
      ...fieldComments,
      newComment
    ]

    onSaveHelper(newComment, update, state, setState, newFieldComments)
    return newFieldComments
  }, [state])

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
