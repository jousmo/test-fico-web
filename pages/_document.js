import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Ficosec Proyectos</title>
          <meta name="title" content="Ficosec Proyectos" />
          <meta
            name="description"
            content={`Fondo de financiamiento de proyectos para la prevención y fortalecimiento de instituciones de
            seguridad y justicia del empresariado chihuahuense.`} />
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
