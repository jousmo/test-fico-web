import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"
import { extendMoment } from "moment-range"
import Moment from "moment"
import { genderTypes } from "../../../../../helpers/selectOptions/implementer/submission"
const moment = extendMoment(Moment)
moment.locale("es")
import { capitalize } from "lodash"

const translateDate = (date, format, currentFormat = "YYYY/MM/DD") => {
  if (!date) return ""
  return moment(date, currentFormat).format(format)
}

const translateGender = gender => genderTypes?.find(el => el.value === gender)

export const onSearch = (data, setState, value) => {
  if (!value) {
    setState(undefined)
    return
  }

  const filter = data?.filter(assistant =>
    assistant.phone?.includes(value) ||
    assistant.name?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.curp?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.colony?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.lastName?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.maidenName?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.problematic?.toLowerCase().includes(value.toLowerCase()) ||
    assistant.municipality?.toLowerCase().includes(value.toLowerCase())
  )
  setState(filter)
}

export const censusExport = async (data, section) => {
  const title = capitalize(section)
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(title)

  let titleInfo = worksheet.getCell("A1")
  titleInfo.value = title
  titleInfo.font = { size: 20, bold: true }

  let census = []

  if (title === 'Asistentes') {
    census = data?.map(({
      id,
      axis,
      submission,
      ...el
    }) => {
      el.birthdate = translateDate(el?.birthdate, "DD/MM/YYYY")
      el.gender = translateGender(el?.gender)?.label
      return Object.values(el)
    })
  } else {
    census = data?.map(({
      id,
      activities,
      submission,
      ...el
    }) => {
      el.birthdate = translateDate(el?.birthdate, "DD/MM/YYYY")
      el.gender = translateGender(el?.gender)?.label
      return Object.values(el)
    })
  }

  census = census?.length ? census : [[]]

  worksheet.addTable({
    name: title,
    ref: `A${worksheet?.lastRow?._number + 2}`,
    headerRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: "Folio" },
      { name: "Nombre" },
      { name: "Apellido paterno" },
      { name: "Apellido materno" },
      { name: "Sexo" },
      { name: "Fecha de nacimiento" },
      { name: "Curp" },
      { name: "Telefono" },
      { name: "Estado" },
      { name: "Municipio" },
      { name: "Colonia" },
      { name: "Edad" },
      { name: "Eje / Actividades" },
      { name: "Problemática" },
      { name: "Proyectos" }
    ],
    rows: census
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), `${title}.xlsx`)
}

