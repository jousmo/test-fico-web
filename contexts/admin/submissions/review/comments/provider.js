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
    let newComments = []
    if (section === "submission"){
      newComments = [...submission?.comments].filter((e, i) =>
        i !== index
      )
      update({ comments: newComments })
    } else if(section === "consultant"){
      const consultant = submission?.consultant
      newComments = [...consultant?.comments].filter((e, i) =>
        i !== index
      )
      const newConsultant = {
        ...consultant,
        comments: newComments
      }
      update({ consultant: newConsultant })
    } else if(section === "generalIndicator"){
      const generalIndicators =
        [...submission?.generalObjectiveIndicators]
      const indicator = generalIndicators[state.field.index]
      newComments = [...indicator?.comments].filter((e, i) =>
        i !== index
      )
      generalIndicators[state.field.index] = {
        ...indicator,
        comments: newComments
      }
      update({ generalObjectiveIndicators: generalIndicators })
    } else if(section === "developmentIndicator"){
      const developmentIndicators =
        [...submission?.developmentObjectiveIndicators]
      const indicator = developmentIndicators[state.field.index]
      newComments = [...indicator?.comments].filter((e, i) =>
        i !== index
      )
      developmentIndicators[state.field.index] = {
        ...indicator,
        comments: newComments
      }
      update({ developmentObjectiveIndicators: developmentIndicators })
    }
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

    if (section === "submission"){
      const submissionComments = submission?.comments
      const newComments = [
        ...submissionComments,
        newComment
      ]
      update({ comments: newComments })
    } else if (section === "consultant"){
      const consultant = submission?.consultant
      const consultantComments = consultant?.comments || []
      const newConsultantComments = [
        ...consultantComments,
        newComment
      ]
      const newConsultant = {
        ...consultant,
        comments: newConsultantComments
      }
      update({ consultant: newConsultant })
    } else if (section === "generalIndicator"){
      const generalIndicators =
        [...submission?.generalObjectiveIndicators]
      const indicator = generalIndicators[state.field.index]
      const indicatorComments = indicator?.comments || []
      const newComments = [
        ...indicatorComments,
        newComment
      ]
      generalIndicators[state.field.index] = {
        ...indicator,
        comments: newComments
      }
      update({ generalObjectiveIndicators: generalIndicators })
    } else if (section === "developmentIndicator"){
      const developmentIndicators =
        [...submission?.developmentObjectiveIndicators]
      const indicator = developmentIndicators[state.field.index]
      const indicatorComments = indicator?.comments || []
      const newComments = [
        ...indicatorComments,
        newComment
      ]
      developmentIndicators[state.field.index] = {
        ...indicator,
        comments: newComments
      }
      update({ developmentObjectiveIndicators: developmentIndicators })
    }
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
