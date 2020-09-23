import React, { useState, useEffect, useContext } from "react"
import nookies from "nookies"
import { firebase } from "../../helpers/auth"

const AuthContext = React.createContext({
  user: null
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, "token", "", null)
        return
      }
      const { claims } = await user.getIdTokenResult()

      const token = await user.getIdToken()
      setUser({ ...user, claims })
      nookies.set(undefined, "token", token, null)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
