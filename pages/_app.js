import "antd/dist/antd.css"
import { ConfigProvider } from "antd"
import { antdConfig } from "../antd.config"

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider {...antdConfig}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
