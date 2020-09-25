import "antd/dist/antd.css"
import { ConfigProvider } from "antd"
import { antdConfig } from "../antd.config"
import { AuthProvider } from "../contexts/auth"

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider {...antdConfig}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ConfigProvider>
  )
}
