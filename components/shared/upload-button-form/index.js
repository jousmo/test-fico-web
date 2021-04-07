import axios from "axios"
import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { warning } from "../../../helpers/alert"
import { useState } from "react"

export function UploadButtonForm({
  children,
  disabled = false,
  onChange,
  onRemoveFile,
  fileList = [],
  maxFile = 1,
  accept
}) {
  const isDisabled = disabled || fileList?.length >= maxFile
  const [state, setState] = useState({ fileList, disabled: isDisabled })
  const [files, setFiles] = useState(fileList)

  const onUploadChange = async info => {
    let fileList = [...info.fileList]
    fileList = fileList.slice(-maxFile)

    fileList = fileList?.map(file => {
      file.url = files.find(el => el.uid === file.uid)?.url
      return file
    })

    setState({ fileList, disabled: fileList.length >= maxFile })
    if (info.file.status === "done") {
      onChange && onChange(fileList)
    } else if (info.file.status === "error") {
      warning("Ha ocurrido un error al subir el archivo, inténtalo de nuevo en unos segundos.")
    }
  }

  const getDataParams = async file => {
    const {
      data: { fields, upload: url }
    } = await axios.get(`${process.env.NEXT_PUBLIC_ASSETS_URI}?file=${file.name}`)
    setFiles(files => ([...files, { url, ...file }]))
    return fields
  }

  return (
    <Upload
      fileList={state.fileList}
      action={process.env.NEXT_PUBLIC_S3_URI}
      data={getDataParams}
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
