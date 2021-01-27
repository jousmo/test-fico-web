import Head from "next/head"
import "antd/dist/antd.css"
import { ConfigProvider } from "antd"
import { antdConfig } from "../antd.config"
import { AuthProvider } from "../contexts/auth"
import { ErrorBoundary } from "../helpers"

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider {...antdConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ErrorBoundary>
    </ConfigProvider>
  )
}
