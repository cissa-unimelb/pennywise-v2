import React from 'react';
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFDownloadLink,
// } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';
// import Invoice from '../../components/Invoice';
import { PdfGenerator } from '../../components/PdfGenerator';
// Create styles

export default function InvoiceGeneration() {
  return (
    <div>
      {/* <button onClick={onGenerate}>generate PDF</button> */}

      {/* <PDFDownloadLink document={<Invoice />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink> */}

      <PdfGenerator></PdfGenerator>

      {/* <PDFViewer  width={500} showToolbar={true}>
      <Invoice></Invoice>
    </PDFViewer> */}
    </div>
  );
}
