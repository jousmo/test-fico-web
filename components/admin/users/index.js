import { useContext, useState } from "react"
import { SearchField, Section } from "../../shared"
import { AdminUserContext } from "../../../contexts/admin/users"
import UsersList from "./list"

export function Users() {
  const {
    loading,
    error,
    data
  } = useContext(AdminUserContext)

  const [state, setState] = useState({ accounts: false })

  const onSearch = (value) => {
    const filter = data?.Accounts?.filter(account => {
      const { email, displayName, role } = account
      return `${email} ${displayName} ${role}`
        .toLowerCase()
        .includes(value.toLowerCase())
    })

    if (!value) {
      setState({ ...state, accounts: false})
    } else {
      setState({ ...state, accounts: filter})
    }
  }

  return (
    <Section style={{padding: 0}}>
      <SearchField onSearch={onSearch} />
      <UsersList
        data={state.accounts ? state.accounts : data?.Accounts}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
