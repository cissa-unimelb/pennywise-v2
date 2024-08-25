import { useState} from "react";
import { useUserStore } from "../stores/user";
import { useNavigate } from "react-router-dom";

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

import { addReimbursement } from "../database";
import { uploadFile } from "../services/upload";
import {DepartmentEnum} from "../database/reimbursement";

let ALL_DEPARTMENTS: DepartmentEnum[] = ["IT", "Events", "Competition", "Education", "Industry", "Project", "Diversity", "Publicity", "Product"];

interface formInitialValues {
  event: string;
  purchase_description: string;
  amount: number;
  date: string;
  additional: string;
  department: DepartmentEnum
};

type initialValuesKey = keyof formInitialValues;

type FormControlBlockProps = {
  formik: FormikProps<formInitialValues>, 
  attribute: initialValuesKey
}

const InputFormControlBlock = (props: FormControlBlockProps):JSX.Element => {
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

type FileUploadBlockInput = {
  setFile: Function
}
const FileUploadBlock = (props: FileUploadBlockInput) => {
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%"
      }}
    >
      <FormLabel
        className=""
        style={{ width: "200px", lineHeight: "38px" }}
      >
        Receipt upload
      </FormLabel>
      <div 
        style={{
          display: "flex",
          alignItems: "left",
          width: "500px"
        }}
      >
        <input 
          type="file"
          id="uploadFile"
          onChange={(event) => {
            if (event.currentTarget.files !== null){
              props.setFile(event.currentTarget.files[0]);
            }
          }}
        />
      </div>
    </div>
  )
}

type SelectFormControlBlockInput = {
  attribute: initialValuesKey;
  formik: FormikProps<formInitialValues>;
  fields: string[];
}

const SelectFormControlBlock = (props: SelectFormControlBlockInput) => {
  let formik = props.formik;
  let name = props.attribute.split("_").join(" ");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return(
    <div 
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%"
      }}
    >
      <FormLabel
        className=""
        style={{ width: "200px", lineHeight: "38px" }}
      >
       {name} 
      </FormLabel>
      <div 
        style={{
          display: "flex",
          alignItems: "left",
          width: "500px"
        }}
      >
        <select name={props.attribute} 
          onChange={formik.handleChange}
          value={formik.values[props.attribute]}>
            {props.fields.map((x) => {
              return(
                <option value={x}>{x}</option>
              );
            })}
        </select>
      </div>
    </div>
  )
}






export const ReimbursementForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(new File([], ""));

  const {value} = useUserStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      event: "",
      purchase_description: "",
      amount: 0,
      date: "",
      additional: "",
      department: 'Events' as DepartmentEnum
    },
    validate(values) {},
    enableReinitialize: true,
    validationSchema: Yup.object({
      event: Yup.string()
        .required("Name is required"),
      purchase_description: Yup.string()
        .required("Purchase description is required"),
      amount: Yup.number()
        .required("Amount is required"),
      date: Yup.date()
        .required("Date is required"),
      additional: Yup.string()
        .required("Additional note is required")
    }),

    onSubmit: async (values) => {
      const {event, purchase_description,
        amount, date, additional, department} = values;
      console.log(values);
      
      console.log("Start submitting");
      // Start submitting
      setIsSubmit(true);
      let receipt_url = await uploadFile(file, value.token);
      
      await addReimbursement({
        // foreign key for the account name, bsb, account number
        userid: value.id,
        // name of event
        event: event,
        // short description
        description: purchase_description,
        // items
        amount: amount.toString(),
        // time of purchase
        purchaseDate: new Date(date),
        // receipt url
        receiptUrl: receipt_url,
        // additional information
        additional: additional,
        department: department,
        state: "Pending"
      });

      // Upload file to the shared drive
      

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

              {/* Back button */}
              <div>
                <Button
                    color="info"
                    variant="solid"
                    style={{
                      margin: "10px",
                      position: "absolute",
                      top: 0,
                      right: 0
                    }}
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Back
                </Button>
              </div>
              
              {/* All fields */}
              <InputFormControlBlock formik={formik} attribute="event" ></InputFormControlBlock>
              <InputFormControlBlock formik={formik} attribute="purchase_description" ></InputFormControlBlock>
              <InputFormControlBlock formik={formik} attribute="amount" ></InputFormControlBlock>
              <InputFormControlBlock formik={formik} attribute="date" ></InputFormControlBlock>

              {/* Upload file */}
              <FileUploadBlock setFile={setFile}></FileUploadBlock>

              {/* Select department */}
              <SelectFormControlBlock formik={formik} fields={ALL_DEPARTMENTS} attribute="department"></SelectFormControlBlock>
              

              <InputFormControlBlock formik={formik} attribute="additional" ></InputFormControlBlock>

              
              
              {/* Submit and back button */}
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
