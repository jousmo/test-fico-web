import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react'
import { warning } from '../../../helpers/alert'

export function UploadButton({
  children,
  style,
  className = "",
  typeFile,
  files,
  onDone,
  onRemove,
  ...props
}) {

  const [fileList, setFileList] = useState([])

  useEffect(() => {
    setFileList(files)
  }, [files])

  const uploadProps = {
    action: "https://assets.dev.jaxitank.com/asset-upload",
    fileList,
    onRemove,

    onChange(info) {
      const { file: { uid, name, status, response } } = info
      const url = response?.imageUrl
      setFileList([{ uid, name, status, url }])

      if (status === 'done') {
        onDone({ typeFile, ...info })
      } else if (status === 'error') {
        warning("Hubo un error al subir el documento")
        setFileList([])
      }
    }
  }

  return (
    <Upload
      className={className}
      {...uploadProps}
    >
      <Button style={style} disabled={!!fileList?.length}>
        <UploadOutlined /> {children}
      </Button>
    </Upload>
  )
}

// action="https://assets.dev.jaxitank.com/asset-upload"