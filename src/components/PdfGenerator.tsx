import React, { useState } from 'react';
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
// import { useUserStore } from "../stores/user";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Invoice from './Invoice';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  img: {
    width: 100,
    height: 50,
  },
});

export const PdfGenerator = () => {
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [valueInvoiceId, setValueInvoiceId] = useState('');
  const [valueRecipient, setValueRecipient] = useState('');
  const [valueRecipientAddress, setValueRecipientAddress] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [valueAmount, setValueAmount] = useState('');
  const [valueAbn, setValueAbn] = useState('');
  // const { value, setUserStore } = useUserStore();
  // const user = value;

  // console.log(user);
  // console.log(value);

  const formik = useFormik({
    initialValues: {
      invoice_id: '',
      recipient: '',
      recipientAddress: '',
      description: '',
      amount: '',
      abn: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      abn: Yup.string()
        .required('Must enter ABN')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(11, 'Must be exactly 11 digits')
        .max(11, 'Must be exactly 11 digits'),

      invoice_id: Yup.string().required('Must enter invoice id/number'),
      recipient: Yup.string().required('Must enter invoice recipient'),
      recipientAddress: Yup.string().required(
        'Must enter invoice recipient address'
      ),
      description: Yup.string().required('Must enter invoice description'),
      amount: Yup.string()
        .required('Must enter amount of money that invoice request ')
        .matches(/^[0-9]+$/, 'Must be only digits'),
    }),
    onSubmit: async (values) => {
      const {
        invoice_id,
        recipient,
        recipientAddress,
        description,
        amount,
        abn,
      } = values;
      setValueInvoiceId(invoice_id);
      setValueRecipient(recipient);
      setValueRecipientAddress(recipientAddress);
      setValueDescription(description);
      setValueAmount(amount);
      setValueAbn(abn);
      console.log(values);
      // somehow put it in <Invoice> component

      // window.open(await ReactPDF.renderToString(pdfContent));
      setIsSubmit(true);
    },
  });
  return (
    <>
      {!isSubmit && (
        <div>
          <ToastContainer />
          <Sheet
            variant="outlined"
            className="sheet"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              justifyContent="center"
              mb={1}
            >
              Invoice Generation
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt3">
                <label className="black">Invoice ID/Number</label>
                <Input
                  type="text"
                  name="invoice_id"
                  value={formik.values.invoice_id}
                  onChange={formik.handleChange}
                  placeholder="Enter the ID of the invoice"
                  className="input-box-container input-reset"
                />
                {formik.errors.invoice_id && formik.touched.invoice_id && (
                  <p className="input-error">{formik.errors.invoice_id}</p>
                )}
              </div>
              <div className="mt3">
                <label className="black">Recipient</label>
                <Input
                  type="text"
                  name="recipient"
                  value={formik.values.recipient}
                  onChange={formik.handleChange}
                  placeholder="Enter the name of the invoice recipient"
                  className="input-box-container input-reset"
                />
                {formik.errors.recipient && formik.touched.recipient && (
                  <p className="input-error">{formik.errors.recipient}</p>
                )}
              </div>
              <div className="mt3">
                <label className="black">recipient ABN</label>
                <Input
                  type="text"
                  name="abn"
                  value={formik.values.abn}
                  onChange={formik.handleChange}
                  placeholder="Enter a recipient ABN"
                  className="input-box-container input-reset"
                />
                {formik.errors.abn && formik.touched.abn && (
                  <p className="input-error">{formik.errors.abn}</p>
                )}
              </div>
              <div className="mt3">
                <label className="black">recipient Address</label>
                <Input
                  type="text"
                  name="recipientAddress"
                  value={formik.values.recipientAddress}
                  onChange={formik.handleChange}
                  placeholder="Enter a recipientAddress"
                  className="input-box-container input-reset"
                />
                {formik.errors.recipientAddress &&
                  formik.touched.recipientAddress && (
                    <p className="input-error">
                      {formik.errors.recipientAddress}
                    </p>
                  )}
              </div>
              <div className="mt3">
                <label className="black">description</label>
                <Input
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Enter description"
                  className="input-box-container input-reset"
                />
                {formik.errors.description && formik.touched.description && (
                  <p className="input-error">{formik.errors.description}</p>
                )}
              </div>
              <div className="mt3">
                <label className="black">amount</label>
                <Input
                  type="text"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  placeholder="Enter amount"
                  className="input-box-container input-reset"
                />
                {formik.errors.amount && formik.touched.amount && (
                  <p className="input-error">{formik.errors.amount}</p>
                )}
              </div>
              {error && <p className="submit-error">{error}</p>}
              <div className="button-container">
                <Button
                  type="submit"
                  id="login"
                  className="solid-buttton"
                  loading={isUploading}
                >
                  Generate
                </Button>
                <br />
              </div>
            </form>
          </Sheet>
        </div>
      )}
      {isSubmit && (
        <Invoice
          invoice_id={valueInvoiceId}
          recipient={valueRecipient}
          recipientAbn={valueAbn}
          recipientAddress={valueRecipientAddress}
          description={valueDescription}
          amount={valueAmount}
        ></Invoice>
      )}
    </>
  );
};
