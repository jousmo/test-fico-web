import { useContext } from "react"
import { Section, Visibility } from "../../../../shared"
import { ImplementerSubmissionContext } from "../../../../../contexts/implementer/submissions/new/context"
import { CommentsForm } from "./form"
import { CommentsList } from "./list"

export function SubmissionComments() {
  const {
    readOnly,
    loading,
    save,
    data
  } = useContext(ImplementerSubmissionContext)

  const { comments, status: revision } = data?.GeneralInformation || {}

  const onAddComment = comment => {
    const newComments = [
      ...comments,
      { comment, revision, fieldName: "SUBMISSION_GENERAL", type: "SUBMISSION_GENERAL" }
    ]

    save(newComments)
  }

  const onDeleteComment = id => {
    const newComments = comments.filter(el => el.id !== id)
    save(newComments)
  }

  return (
    <Section>
      <Visibility visible={!readOnly}>
        <CommentsForm readOnly={readOnly} onChange={onAddComment} />
      </Visibility>
      <CommentsList
        onDelete={onDeleteComment}
        comments={comments?.filter(el => el.type === "SUBMISSION_GENERAL")}
        loading={loading}
        readOnly={!readOnly} />
    </Section>
  )
}
