import { List } from "antd"
import { CompositeField, ConfirmModal } from "../../../shared"
import { UserItem } from "./item"
import { withForm } from "../../../../helpers/withForm"
import { ModalInvitation } from "../../users/list/invitation"
import { useContext, useState } from "react"
import { AdminUserContext } from "../../../../contexts/admin/users"
import "./styles.sass"

function UsersList({ data: accounts }) {
  const { save, recovery, update, disabled } = useContext(AdminUserContext)

  const [state, setState] = useState({
    id: null,
    openConfirm: false,
    openModal: false,
    account: null
  })

  const onToggleModal = () => {
    if (state.openModal) {
      setState({ ...state, account: null, openModal: !state.openModal })
      return
    }
    setState({ ...state, openModal: !state.openModal })
  }

  const onToggleConfirm = () => {
    setState({ ...state, openConfirm: !state.openConfirm })
  }

  const onSave = data => {
    if (state.account) {
      const { account: { id }} = state
      const { email, ...newData } = data
      update && update(id, newData)
    } else {
      save && save(data)
    }
    onToggleModal()
  }

  const onRecovery = email => {
    recovery && recovery(email)
  }

  const onEdit = id => {
    setState({ ...state, openConfirm: !state.openConfirm, id })
  }

  const onChangeAlias = account => {
    setState({ ...state, openModal: !state.openModal, account })
  }

  const onDisabled = (id, status) => {
    disabled && disabled(id, status)
  }

  const onOk = () => {
    setState({ ...state, openConfirm: !state.openConfirm })
    update && update(state?.id, { role: "IMPLEMENTER" })
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
              account={state?.account}
              visible={state?.openModal}
              onSave={onSave}
              onCancel={onToggleModal}/>
            <List
              className="fico users-list"
              renderItem={i =>
                <UserItem
                  user={i}
                  onAlias={() => onChangeAlias(i)}
                  onRecovery={onRecovery}
                  onEdit={onEdit}
                  onDisabled={onDisabled}/>
              }
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
