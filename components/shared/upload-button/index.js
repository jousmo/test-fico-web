import { Upload, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { success, warning } from "../../../helpers/alert"

export function UploadButton({
  children,
  className,
  disabled,
  typeFile,
  files = [],
  onDoneFile,
  onRemoveFile,
  maxFile = 1,
  multiple = false
}) {
  const isDisabled = files?.length >= maxFile
  const [fileList, setFileList] = useState(files)

  useEffect(() => {
    setFileList(files)
  }, [files])

  const findAndDelete = file => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const uploadProps = {
    action:`${process.env.NEXT_PUBLIC_S3_URI}/asset-upload`,
    fileList,
    multiple,
    onChange(info) {
      setFileList(info.fileList.slice())

      if (info.file.status === "done") {
        onDoneFile({ typeFile, ...info }, (err, refetch = () => null) => {
          if (err) {
            warning("Hubo un error al guardar el documento")
            findAndDelete(info.file)
          } else {
            success("Documento guardado correctamente")
            refetch()
          }
        })
      } else if (info.file.status === "error") {
        warning("Hubo un error al subir el documento")
      }
    },
    onRemove(file) {
      onRemoveFile(file, (err, refetch = () => null) => {
        if (err) {
          warning("Hubo un error al eliminar el documento")
        } else {
          success("Documento eliminado correctamente")
          findAndDelete(file)
          refetch()
        }
      })
    }
  }

  return (
    <Upload
      className={className}
      {...uploadProps}>
      <Button disabled={disabled || isDisabled }>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}