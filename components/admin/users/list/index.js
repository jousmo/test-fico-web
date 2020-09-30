import { List } from "antd"
import { CompositeField } from "../../../shared"
import { UserItem } from "./item"
import { withForm } from "../../../../helpers/withForm"
import { ModalInvitation } from "../../users/list/invitation"
import { useContext, useState } from "react"
import { AdminUserContext } from "../../../../contexts/admin/users"
import "./styles.sass"

function UsersList({ data: accounts }) {
  const { save } = useContext(AdminUserContext)

  const [state, setState] = useState({
    openModal: false
  })

  const onToggleModal = () => {
    setState({ openModal: !state.openModal })
  }

  const onSave = (account) => {
    save && save(account)
    onToggleModal()
  }

  return (
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
            renderItem={i => <UserItem user={i} />}
            itemLayout="vertical"
            dataSource={items}
            pagination={{pageSize: 10}} />
        </>
      }
    </CompositeField>
  )
}

export default withForm(UsersList)
