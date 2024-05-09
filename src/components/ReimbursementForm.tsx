import { useState} from "react";

// import { StyleSheet } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';
// import { useUserStore } from "../stores/user";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addSubmission } from "../database";

interface initialValues {
  name: string,
  bank_name: string,
  event: string,
  purchase_description: string,
  amount: number,
  date: string,
  receipt_url: string,
  additional: string,
  BSB: string,
  accountNo: string
};

type initialValuesKey = keyof initialValues;

type FormControlBlockProps = {
  formik: FormikProps<initialValues>, 
  attribute: initialValuesKey
}

const FormControlBlock = (props: FormControlBlockProps):JSX.Element => {
  const formik = props.formik;
  const attribute = props.attribute;
  let name = attribute.split("_").join(" ");
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return(
    <FormControl
        className=""
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <FormLabel
          className=""
          style={{ width: "200px", lineHeight: "38px" }}
        >
          {name}
        </FormLabel>
        <Input
          id={`text_item_${attribute}`}
          type="text"
          name={attribute}
          value={formik.values[attribute]}
          onChange={formik.handleChange}
          placeholder={"Enter " + attribute}
          className="input-box-container input-reset"
          style={{ width: "500px" }}
        />
        {formik.errors[attribute] && formik.touched[attribute] && (
          <p className="input-error">{formik.errors[attribute]}</p>
        )}
    </FormControl>
  )
}




// import { useUserStore } from "../stores/user";
export const ReimbursementForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      bank_name: "",
      event: "",
      purchase_description: "",
      amount: 0,
      date: "",
      receipt_url: "",
      additional: "",
      BSB: "",
      accountNo: ""
    },
    validate(values) {},
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required"),
      bank_name: Yup.string()
        .required("Bank name is required"),
      event: Yup.string()
        .required("Name is required"),
      purchase_description: Yup.string()
        .required("Purchase description is required"),
      amount: Yup.number()
        .required("Amount is required"),
      date: Yup.date()
        .required("Date is required"),
      receipt_url: Yup.string()
        .required("Receipt url is required"),
      additional: Yup.string()
        .required("Additional note is required"),
      BSB: Yup.string()
        .required("BSB is required"),
      accountNo: Yup.string()
        .required("accountNo is required")
    }),

    onSubmit: async (values) => {
      const {name, bank_name, event, purchase_description,
        amount, date, receipt_url, additional, BSB, accountNo} = values;
      console.log(values);
      
      console.log("Start submitting");
      // Start submitting
      setIsSubmit(true);
      
      await addSubmission({
        // foreign key for the account name, bsb, account number
        userid: "0",
        // name of event
        event: event,
        // short description
        description: purchase_description,
        // items
        invoices: [{
          description: purchase_description,
          amount: amount.toString()
        }],
        // time of purchase
        purchaseDate: new Date(date),
        // receipt url
        receiptUrl: receipt_url,
        // additional information
        additional: additional
      });

      console.log("Finish submitting");
    
      setIsSubmit(false);
    },
  });


  

  return (
    <>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ backgroundColor: "#fff" }}>
            <ToastContainer />

            <Sheet
              variant="outlined"
              className="sheet"
              sx={{
                width: 800,
                mx: "auto", // margin left & right
                my: 4, // margin top & bottom
                py: 4, // padding top & bottom
                px: 6, // padding left & right
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                // gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
            >
              <div
                style={{
                  width: "100vw",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                  textAlign="center"
                  mb={1}
                >
                  Reimbursement Form
                </Typography>
              </div>
              
              {/* All fields */}
              <FormControlBlock formik={formik} attribute="name" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="bank_name" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="event" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="purchase_description" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="amount" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="date" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="receipt_url" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="additional" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="BSB" ></FormControlBlock>
              <FormControlBlock formik={formik} attribute="accountNo" ></FormControlBlock>            
              
              {/* Submit button */}
              <div
                style={{
                  display: "block",
                  marginLeft: "80%",
                  width: "100%"
                }}
              >
                <Button
                    type="submit"
                    loading={isSubmit}
                    color="primary"
                    variant="solid"
                  >
                    Submit
                </Button>
              </div>
            </Sheet>
          </div>
        </form>
    </>
  );
};
