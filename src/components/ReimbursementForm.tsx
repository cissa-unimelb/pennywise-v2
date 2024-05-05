import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

// import { StyleSheet } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';
// import { useUserStore } from "../stores/user";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// import { useUserStore } from "../stores/user";
export const ReimbursementForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      
    },
    validate(values) {},
    enableReinitialize: true,
    validationSchema: Yup.object({}),

    onSubmit: async (values) => {

      setIsSubmit(true);
    },
  });


  

  return (
    <>
      {!isSubmit && (
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



              
            </Sheet>
          </div>
        </form>
      )}
    </>
  );
};
