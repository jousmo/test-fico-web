import * as ExcelJS from "exceljs"
import { saveAs } from "file-saver"

export const generalInformationExport = async data => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("My Sheet")

  const title = worksheet.getCell("A1")
  title.value = "Información General"
  title.font = { size: 20, bold: true }

  worksheet.addTable({
    name: "MyTable",
    ref: "A3",
    columns: [
      { name: "Tipo de solicitud" },
      { name: "Convocatoria a la que aplica" },
      { name: "Nombre del proyecto" },
      { name: "Municipio" },
      { name: "Región" },
      { name: "Aliados del proyecto" },
      { name: "Lugar de implementación" },
      { name: "Responsable del proyecto" },
      { name: "Fecha de inicio" },
      { name: "Fecha de conclusión" },
      { name: "Eje estratégico" },
      { name: "Nivel de prevención" },
      { name: "Ámbitos de intervención del Proyecto" },
      { name: "Problemática a tratar" },
      { name: "Descripción del proyecto" },
      { name: "Justificación" }
    ],
    rows: [
      [
        data?.type,
        data?.name,
        data?.applyingCall,
        data?.township,
        data?.region,
        data?.allies.join(','),
        data?.implementationPlace,
        data?.responsible,
        data?.startDate,
        data?.endDate,
        data?.strategicAxis,
        data?.preventionLevel.join(','),
        data?.scope.join(','),
        data?.issueDescription,
        data?.description,
        data?.justification
      ]
    ]
  })

  const buf = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), "export.xlsx")
}
