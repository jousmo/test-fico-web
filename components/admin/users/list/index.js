import { List } from "antd"
import { CompositeField, ConfirmModal } from "../../../shared"
import { UserItem } from "./item"
import { withForm } from "../../../../helpers/withForm"
import { ModalInvitation } from "../../users/list/invitation"
import { useContext, useState } from "react"
import { AdminUserContext } from "../../../../contexts/admin/users"
import "./styles.sass"

function UsersList({ data: accounts }) {
  const { save, recovery, update } = useContext(AdminUserContext)

  const [state, setState] = useState({
    id: null,
    openConfirm: false,
    openModal: false
  })

  const onToggleModal = () => {
    setState({ ...state, openModal: !state.openModal })
  }

  const onToggleConfirm = () => {
    setState({ ...state, openConfirm: !state.openConfirm })
  }

  const onSave = account => {
    save && save(account)
    onToggleModal()
  }

  const onRecovery = email => {
    recovery && recovery(email)
  }

  const onEdit = id => {
    setState({ ...state, openConfirm: !state.openConfirm, id })
  }

  const onOk = () => {
    setState({ ...state, openConfirm: !state.openConfirm })
    update && update(state?.id)
  }

  return (
    <>
      <CompositeField
        onClickAdd={onToggleModal}
        onChange={null}
        value={accounts}
        addLabel="Invitar usuarios"
        orientation="TOP">
        {({ items }) =>
          <>
            <ModalInvitation
              visible={state?.openModal}
              onSave={onSave}
              onCancel={onToggleModal}/>
            <List
              className="fico users-list"
              renderItem={i => <UserItem user={i} onRecovery={onRecovery} onEdit={onEdit}/>}
              itemLayout="vertical"
              dataSource={items}
              pagination={{pageSize: 10}} />
          </>
        }
      </CompositeField>
      <ConfirmModal
        cancelText="Cancelar"
        onCancel={onToggleConfirm}
        onOk={onOk}
        okText="Cambiar cuenta"
        title="¿Estas seguro de cambiar la cuenta a implementadora?"
        visible={state?.openConfirm} />
    </>
  )
}

export default withForm(UsersList)
