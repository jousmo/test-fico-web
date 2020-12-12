import React, { useState, useEffect, useContext } from "react"
import nookies, { destroyCookie } from "nookies"
import { firebase } from "../../helpers/auth"
import moment from "moment"

const AuthContext = React.createContext({
  user: null
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, "token", "", {
          path: "/",
          expires: moment().add("1", "hour").toDate()
        })
        destroyCookie(null, "token")
        return
      }
      const { claims } = await user.getIdTokenResult()

      const token = await user.getIdToken()
      setUser({ ...user, claims })
      nookies.set(undefined, "token", token, { path: "/" })
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
