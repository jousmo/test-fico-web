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
        <Head>
          <title>Ficosec Proyectos</title>
          <meta name="title" content="Ficosec Proyectos" />
          <meta
            name="description"
            content={`Fondo de financiamiento de proyectos para la prevención y fortalecimiento de instituciones de
            seguridad y justicia del empresariado chihuahuense.`} />
        </Head>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ErrorBoundary>
    </ConfigProvider>
  )
}
