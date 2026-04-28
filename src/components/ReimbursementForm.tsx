import { useContext, useState } from "react";
import { UserContext } from "../stores/user";
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
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addReimbursement } from "../database";
import { uploadFile } from "../services/upload";
import { DepartmentEnum } from "../database/reimbursement";

let ALL_DEPARTMENTS: DepartmentEnum[] = [
  "IT",
  "Events",
  "Competition",
  "Education",
  "Industry",
  "Project",
  "Diversity",
  "Publicity",
  "Product",
];

interface formInitialValues {
  event: string;
  purchase_description: string;
  amount: number;
  date: string;
  additional: string;
  department: DepartmentEnum;
}

type initialValuesKey = keyof formInitialValues;

type FormControlBlockProps = {
  formik: FormikProps<formInitialValues>;
  attribute: initialValuesKey;
};

const InputFormControlBlock = (props: FormControlBlockProps): JSX.Element => {
  const formik = props.formik;
  const attribute = props.attribute;
  let name = attribute.split("_").join(" ");
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <FormControl className="app-form-row">
      <FormLabel className="app-form-label" sx={{ color: "#fff" }}>
        {name}
      </FormLabel>
      <Input
        id={`text_item_${attribute}`}
        type="text"
        name={attribute}
        value={formik.values[attribute]}
        onChange={formik.handleChange}
        placeholder={"Enter " + attribute}
        className="app-form-field input-box-container input-reset"
        sx={{
          "--Input-radius": "18px",
          "--Input-paddingInline": "14px",
          bgcolor: "rgba(8, 15, 29, 0.78)",
          color: "#fff",
          "& input": {
            color: "#fff",
            WebkitTextFillColor: "#fff",
          },
        }}
      />
      {formik.errors[attribute] && formik.touched[attribute] && (
        <p className="input-error">{formik.errors[attribute]}</p>
      )}
    </FormControl>
  );
};

type FileUploadBlockInput = {
  setFile: Function;
};
const FileUploadBlock = (props: FileUploadBlockInput) => {
  return (
    <div className="app-form-row">
      <FormLabel className="app-form-label" sx={{ color: "#fff" }}>
        Receipt upload
      </FormLabel>
      <div className="app-form-field">
        <input
          type="file"
          id="uploadFile"
          className="app-file-input"
          onChange={(event) => {
            if (event.currentTarget.files !== null) {
              props.setFile(event.currentTarget.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

type SelectFormControlBlockInput = {
  attribute: initialValuesKey;
  formik: FormikProps<formInitialValues>;
  fields: string[];
};

const SelectFormControlBlock = (props: SelectFormControlBlockInput) => {
  let formik = props.formik;
  let name = props.attribute.split("_").join(" ");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="app-form-row">
      <FormLabel className="app-form-label" sx={{ color: "#fff" }}>
        {name}
      </FormLabel>
      <div className="app-form-field">
        <select
          name={props.attribute}
          className="app-form-select"
          onChange={formik.handleChange}
          value={formik.values[props.attribute]}
          style={{ color: "#fff", backgroundColor: "rgba(8, 15, 29, 0.78)" }}
        >
          {props.fields.map((x) => {
            return (
              <option key={x} value={x}>
                {x}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export const ReimbursementForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(new File([], ""));

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      event: "",
      purchase_description: "",
      amount: 0,
      date: "",
      additional: "",
      department: "Events" as DepartmentEnum,
    },
    validate(values) {},
    enableReinitialize: true,
    validationSchema: Yup.object({
      event: Yup.string().required("Name is required"),
      purchase_description: Yup.string().required(
        "Purchase description is required",
      ),
      amount: Yup.number().required("Amount is required"),
      date: Yup.date().required("Date is required"),
      additional: Yup.string().required("Additional note is required"),
    }),

    onSubmit: async (values) => {
      const {
        event,
        purchase_description,
        amount,
        date,
        additional,
        department,
      } = values;
      console.log(values);

      console.log("Start submitting");
      // Start submitting
      setIsSubmit(true);
      let receipt_url = await uploadFile(file, user.token as string);

      await addReimbursement({
        // foreign key for the account name, bsb, account number
        userid: user.id,
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
        state: "Active",
      });

      // Upload file to the shared drive

      console.log("Finish submitting");

      setIsSubmit(false);
    },
  });

  return (
    <>
      <div
        className="app-form-page"
        style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
      >
        <IconButton
          aria-label="Back to dashboard"
          variant="soft"
          color="neutral"
          onClick={() => {
            navigate("/dashboard");
          }}
          sx={{ mt: 4, flexShrink: 0 }}
        >
          <ArrowBack />
        </IconButton>

        <form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
          <ToastContainer />

          <Sheet
            variant="outlined"
            className="app-form-card"
            sx={{
              width: "min(940px, 100%)",
              mx: "auto", // margin left & right
              my: 4, // margin top & bottom
              py: 4, // padding top & bottom
              px: { xs: 2.5, md: 4 }, // padding left & right
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-between",
              borderRadius: "28px",
              boxShadow: "md",
            }}
          >
            <div className="app-form-header">
              <div>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="body2"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "primary.300",
                    mb: 1,
                  }}
                >
                  Expense claim
                </Typography>
                <Typography
                  level="h2"
                  className="app-form-title"
                  sx={{
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    color: "#fff",
                  }}
                >
                  Reimbursement Form
                </Typography>
                <Typography
                  level="body1"
                  className="app-form-subtitle"
                  sx={{ color: "#fff" }}
                >
                  Submit your reimbursement claim here
                </Typography>
              </div>
            </div>

            {/* All fields */}
            <Box className="app-form-grid">
              <InputFormControlBlock formik={formik} attribute="event" />
              <InputFormControlBlock
                formik={formik}
                attribute="purchase_description"
              />
              <InputFormControlBlock formik={formik} attribute="amount" />
              <InputFormControlBlock formik={formik} attribute="date" />

              {/* Upload file */}
              <FileUploadBlock setFile={setFile} />

              {/* Select department */}
              <SelectFormControlBlock
                formik={formik}
                fields={ALL_DEPARTMENTS}
                attribute="department"
              />

              <InputFormControlBlock formik={formik} attribute="additional" />
            </Box>

            <div className="app-form-actions">
              <Button
                type="submit"
                loading={isSubmit}
                color="primary"
                variant="solid"
                sx={{ borderRadius: 999, px: 3, color: "#041014" }}
              >
                Submit
              </Button>
            </div>
          </Sheet>
        </form>
      </div>
    </>
  );
};
