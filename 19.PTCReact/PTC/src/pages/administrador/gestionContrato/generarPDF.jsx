import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Para tablas más avanzadas

const generarPDF = (formData) => {

  // Obtener la fecha del día de hoy
  const fechaHoy = new Date();
  const dia = fechaHoy.getDate().toString().padStart(2, '0'); // Día con dos dígitos
  const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
  const año = fechaHoy.getFullYear();

  // Formatear la fecha en el formato deseado (ejemplo: "12 de diciembre de 2024")
  const fechaFormateada = `${dia} de ${getMesNombre(mes)} de ${año}`;

  // Función para obtener el nombre del mes
  function getMesNombre(mes) {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return meses[mes - 1];
  }

  const doc = new jsPDF();

  // Página inicial
  doc.addPage('a4');

  // Colores
  const DARK_BLUE = [0, 51, 102];
  const GRAY = [100, 100, 100];

  // Título del contrato
  doc.setFillColor(...DARK_BLUE);
  doc.rect(10, 10, 190, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('CONTRATO DE SERVICIOS DE DETECTIVES PRIVADOS', 105, 20, { align: 'center' });

  // Restablecer color de texto
  doc.setTextColor(0, 0, 0);

  // Función para agregar los encabezados de las secciones
  function addSectionHeader(doc, text, yPosition) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...DARK_BLUE);
    doc.text(text, 20, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  }

  // Función para verificar el espacio y cambiar de página si es necesario
  function checkPageOverflow(doc, yPosition) {
    if (yPosition > 270) { // Si el texto está cerca del final de la página (ajustar según el tamaño de la página)
      doc.addPage(); // Agregar nueva página
      yPosition = 20; // Reiniciar la posición en la nueva página
    }
    return yPosition;
  }

  function ajustarTexto(doc, texto, yPosition, maxWidth) {
    const lineHeight = 8; // Altura de la línea de texto (ajusta según sea necesario)
    const lines = doc.splitTextToSize(texto, maxWidth); // Divide el texto en líneas que quepan en el ancho

    // Verifica si el texto se desborda hacia abajo
    if (yPosition + lines.length * lineHeight > doc.internal.pageSize.height - 20) { // 20 es el margen inferior
      doc.addPage(); // Si el texto no cabe, agrega una nueva página
      yPosition = 20; // Reinicia la posición Y en la nueva página
    }

    // Dibuja las líneas de texto en el documento
    lines.forEach((line, index) => {
      doc.text(line, 20, yPosition + index * lineHeight); // Dibuja cada línea a la posición correspondiente
    });

    return yPosition + lines.length * lineHeight; // Devuelve la nueva posición Y después del texto
  }

  // Información general
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  let yPosition = 40;

  doc.text(`En Bogotá DC, a ${fechaFormateada}`, 105, yPosition, { align: 'center' });

  yPosition += 20;

  // Datos de La Agencia
  doc.setFont('helvetica', 'bold');
  doc.text('ENTRE:', 20, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'normal');
  const agenciaTexto = `La Agencia de Detectives PTC, con domicilio en Carrera 17 #79-04, representada por Jeison Villamil, con documento de identidad 1134894848, en adelante referida como "La Agencia".`;
  const agenciaTextoDividido = doc.splitTextToSize(agenciaTexto, 170); // Ajustar según el margen
  yPosition = checkPageOverflow(doc, yPosition);
  doc.text(agenciaTextoDividido, 20, yPosition);
  yPosition += agenciaTextoDividido.length * 9;

  // Datos del Cliente
  doc.setFont('helvetica', 'bold');
  doc.text('Cliente:', 20, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'normal');
  const clienteTexto = `${formData.cliente.nombres} ${formData.cliente.apellidos}, con documento de identidad ${formData.cliente.numeroDocumento}, en adelante referido como "El Cliente".`;
  const clienteTextoDividido = doc.splitTextToSize(clienteTexto, 170);
  yPosition = checkPageOverflow(doc, yPosition);
  doc.text(clienteTextoDividido, 20, yPosition);
  yPosition += clienteTextoDividido.length * 10;

  // Datos del Detective
  doc.setFont('helvetica', 'bold');
  doc.text('Detective:', 20, yPosition);
  yPosition += 8;

  doc.setFont('helvetica', 'normal');
  const detectiveTexto = `${formData.detective.nombres} ${formData.detective.apellidos}, con documento de identidad ${formData.detective.numeroDocumento}, especialidad ${formData.detective.especialidad}, en adelante referido como "El Detective".`;
  const detectiveTextoDividido = doc.splitTextToSize(detectiveTexto, 170);
  yPosition = checkPageOverflow(doc, yPosition);
  doc.text(detectiveTextoDividido, 20, yPosition);
  yPosition += detectiveTextoDividido.length * 10;

  // Cláusula 1: Objeto del Contrato
  addSectionHeader(doc, '1. Objeto del Contrato', yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');

  const objetoContrato = "La Agencia se compromete a prestar los servicios de investigación y detección privados a El Cliente, conforme a las especificaciones detalladas en el presente contrato.";
  const objetoContratoDividido = doc.splitTextToSize(objetoContrato, 170); // Ajustar el tamaño según el margen
  yPosition = checkPageOverflow(doc, yPosition);
  doc.text(objetoContratoDividido, 20, yPosition);
  yPosition += objetoContratoDividido.length * 10;
  yPosition = checkPageOverflow(doc, yPosition);

  // Cláusula 2: Descripción del Servicio
  addSectionHeader(doc, '2. Descripción del Servicio', yPosition);
  yPosition += 8;
  const textoInvestigaciones = "La Agencia se encargará de realizar investigaciones privadas en el tipo de investigación: fraude, seguimientos, investigaciones familiares, etc. que el cliente necesite. Las especificaciones del servicio se detallan a continuación:";
  const textoInvestigacionesDividido = doc.splitTextToSize(textoInvestigaciones, 170);
  yPosition = checkPageOverflow(doc, yPosition);
  doc.text(textoInvestigacionesDividido, 20, yPosition);
  yPosition += textoInvestigacionesDividido.length * 8;
  yPosition = checkPageOverflow(doc, yPosition);

  doc.setFont('helvetica', 'bold');
  doc.text("• Descripción del servicio:", 20, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(`${formData.descripcionServicio}`, 30, yPosition);
  yPosition += 10;
  yPosition = checkPageOverflow(doc, yPosition);

  doc.setFont('helvetica', 'bold');
  doc.text("• Fecha de inicio:", 20, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(` ${formData.fechaInicio}`, 30, yPosition);
  yPosition += 10;
  yPosition = checkPageOverflow(doc, yPosition);

  doc.setFont('helvetica', 'bold');
  doc.text("• Fecha de finalización:", 20, yPosition);
  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.text(` ${formData.fechaCierre}`, 30, yPosition);
  yPosition += 10;
  yPosition = checkPageOverflow(doc, yPosition);

  // Generar el PDF final
  doc.save('Contrato_DetDetective.pdf');

  return (
    <div>
      <button onClick={() => generarPDF()}>Generar PDF</button>
    </div>
  );
};

export default generarPDF;
