import { CommentsContext } from "./context"
import moment from "moment"
import {
  CommentModal
} from "../../../../../components/admin/submissions/review"
import { useCallback, useState } from "react"

export function CommentsProvider({ children, submission, readOnly, update }) {
  const revision = submission?.status
  const [state, setState] = useState({ isModalOpen: false, field: {} })

  const openCommentsModal = useCallback(() => {
    console.log(state)
    setState({ ...state, isModalOpen: true })
  }, [state])

  const getCommentsNumber = useCallback(() => {
    /** use state.field.name and state.field.section to
     * retrieve the comments number */
  }, [state, revision])

  const setField = field => {
    setState({ ...state, field: field })
  }

  const onSave = values => {
    const section = state.field.section
    if (section === "submission"){
      const comments = submission?.comments || []
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
        getCommentsNumber
      }}>
      <CommentModal
        onSave={onSave}
        onCancel={onCancel}
        visible={state.isModalOpen}
        revision={revision}
        readOnly={readOnly}
        fieldSection={state.field.section}
        fieldName={state.field.name} />
      { children }
    </CommentsContext.Provider>
  )
}
