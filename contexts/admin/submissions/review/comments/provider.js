import { CommentsContext } from "./context"
import moment from "moment"
import {
  CommentModal
} from "../../../../../components/admin/submissions/review"
import { Visibility } from "../../../../../components/shared"
import { useCallback, useEffect, useState } from "react"
import { getCommentsHelper, onDeleteHelper, onSaveHelper } from "./helpers"

export function CommentsProvider({ children, onCommentsReview, submission, readOnly, update }) {
  const revision = submission?.status
  const [state, setState] = useState({
    isModalOpen: false, field: {}, comments: [], submission: submission
  })

  useEffect(() => {
    setState({ ...state, submission: submission })
  }, [submission])

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

  const onDelete = useCallback((comment) => {
    onDeleteHelper(comment, state, setState, update)
  }, [state])

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
      <Visibility visible={state.isModalOpen}>
        <CommentModal
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
          onCommentsReview={onCommentsReview}
          visible={state.isModalOpen}
          revision={revision}
          readOnly={readOnly}
          getComments={getComments}
          field={state.field} />
      </Visibility>
      { children }
    </CommentsContext.Provider>
  )
}
