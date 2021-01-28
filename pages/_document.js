import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Ficosec Proyectos</title>
          <meta property="og:title" content="Ficosec Proyectos" />
          <meta property="og:site_name" content="FICOSEC.ORG" />
          <meta property="og:locale" content="es_MX" />
          <meta property="og:image" content="/assets/logo-fico.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="600" />
          <meta
            property="og:description"
            content={`Fondo de financiamiento de proyectos para la prevención y fortalecimiento de instituciones de
            seguridad y justicia del empresariado chihuahuense.`} />
          <link
            rel="icon"
            type="image/svg"
            href="/assets/icon.png" />
          <script src="/assets/vendors.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
