import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { warning } from "../../../helpers/alert"
import { useState } from "react"

export function UploadButtonForm({
  children,
  onChange,
  onRemoveFile,
  fileList = [],
  maxFile = 1,
  accept
}) {
  const [state, setState] = useState({ fileList, disabled: false })

  const onUploadChange = info => {
    let fileList = [...info.fileList]
    fileList = fileList.slice(-maxFile)

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.imageUrl
      }
      return file
    })

    setState({ fileList, disabled: fileList.length >= maxFile })

    if (info.file.status === "done") {
      onChange && onChange(fileList)
    } else if (info.file.status === "error") {
      warning("Ha ocurrido un error al subir el archivo, inténtalo de nuevo en unos segundos.")
    }
  }

  return (
    <Upload
      fileList={state.fileList}
      action={`${process.env.NEXT_PUBLIC_S3_URI}/asset-upload`}
      onChange={onUploadChange}
      onRemove={onRemoveFile}
      accept={accept}
      multiple>
      <Button disabled={state.disabled}>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}