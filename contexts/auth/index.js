import React, { useState, useEffect, useContext } from "react"
import nookies from "nookies"
import { firebase } from "../../helpers/auth"
import moment from "moment"

const AuthContext = React.createContext({
  user: null
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async user => {
      if (user) {
        const { claims } = await user.getIdTokenResult()
        const token = await user.getIdToken()
        setUser({ ...user, claims })
        nookies.set(undefined, "token", token, {
          path: "/",
          expires: moment().add("1", "hour").toDate()
        })
      }
    })
  }, [])

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
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
