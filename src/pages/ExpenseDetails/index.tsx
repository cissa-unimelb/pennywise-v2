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
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import IconButton from "@mui/joy/IconButton";
import Star from "@mui/icons-material/Star";
import Delete from "@mui/icons-material/Delete";
import ListItemDecorator, {
  listItemDecoratorClasses,
} from "@mui/joy/ListItemDecorator";
import Box from "@mui/joy/Box";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useUserStore } from "../stores/user";
export default function ExpenseDetails() {
  const [error] = useState("");
  const [isUploading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [valueExpenseId, setValueExpenseId] = useState("");
  // const { value } = useUserStore();
  const [valueRecipient, setValueRecipient] = useState("");
  const [valueRecipientAddress, setValueRecipientAddress] = useState("");
  const [valueTotalAmount, setValueTotalAmount] = useState("0.00");
  const [valueItems, setValueItems] = useState<
    {
      description: string;
      amount: string;
    }[]
  >([]);

  const [valueAbn, setValueAbn] = useState("");
  const formik = useFormik({
    initialValues: {
      expense_id: "",
      recipient: "",
      recipientAddress: "",
      description: "",
      amount: "",
      abn: "",
    },
    validate(values) {},
    enableReinitialize: true,
    validationSchema: Yup.object({
      abn: Yup.string()
        .required("Must enter ABN")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(11, "Must be exactly 11 digits")
        .max(11, "Must be exactly 11 digits"),

      expense_id: Yup.string().required("Must enter expense id/number"),
      recipient: Yup.string().required("Must enter expense recipient"),
      recipientAddress: Yup.string().required(
        "Must enter expense recipient address"
      ),
    }),

    onSubmit: async (values) => {
      const { expense_id, recipient, recipientAddress, abn } = values;
      setValueExpenseId(expense_id);
      setValueRecipient(recipient);
      setValueRecipientAddress(recipientAddress);
      setValueAbn(abn);

      setIsSubmit(true);
    },
  });

  const calcTotalAmount = useCallback(() => {
    let totalAmount = 0;
    for (let i = 0; i < valueItems.length; i++) {
      if (isNaN(Number.parseFloat(valueItems[i].amount))) continue;
      totalAmount += Number.parseFloat(valueItems[i].amount);
    }
    setValueTotalAmount(totalAmount.toFixed(2));
  }, [valueItems]);

  useEffect(() => {
    calcTotalAmount();
    console.log(`TotalAmount:  ${valueTotalAmount} `);
  }, [calcTotalAmount, valueItems, valueTotalAmount]);

  const addItemHandle = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // alert(123);
    // formik.validateField('description');
    // formik.validateField('amount');
    let validatePass = true;
    if (formik.values.amount.trim().length === 0) {
      validatePass = false;
      formik.errors.amount = "Must enter amount of money that expense request";
      console.log(formik.errors.amount);
      formik.setTouched({ amount: true });
    } else if (
      !/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(formik.values.amount)
    ) {
      formik.errors.amount = "Must be only digits";
      console.log(formik.errors.amount);
      validatePass = false;
      formik.setTouched({ amount: true });
    }
    if (formik.values.description.trim().length === 0) {
      validatePass = false;
      formik.errors.description = "Must enter expense description";
      console.log(formik.errors.description);

      formik.setTouched({ description: true });
    }

    if (!validatePass) {
      return;
    }
    formik.errors.description = "";
    formik.errors.amount = "";
    formik.setTouched({ description: false, amount: false });
    let newItems: {
      description: string;
      amount: string;
    }[] = [...valueItems] || [];
    newItems.push({
      description: formik.values.description,
      amount: Number.parseFloat(formik.values.amount).toFixed(2),
    });
    setValueItems(newItems);

    formik.setFieldValue("description", "");
    formik.setFieldValue("amount", "");
  };
  const deleteItemHandle = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    let target = e.target;
    let button;
    if (target instanceof SVGPathElement) {
      button = target.ownerSVGElement?.parentElement;
    } else if (target instanceof SVGSVGElement) {
      button = target.parentElement;
    } else if (target instanceof HTMLButtonElement) {
      button = target;
    } else {
      return;
    }

    let li: ParentNode | HTMLElement | undefined | null =
      button?.parentNode?.parentNode;
    if (li instanceof HTMLLIElement) {
      let ul: ParentNode | HTMLElement | undefined | null = li.parentNode;
      if (ul instanceof HTMLUListElement) {
        for (var i = 0; i < ul.childNodes.length; i++) {
          if (li === ul.childNodes[i]) {
            console.log("delete item index is " + i);
            let newItems: {
              description: string;
              amount: string;
            }[] = [...valueItems];
            newItems.splice(i, 1);
            setValueItems(newItems);
            break;
          }
        }
      }
    }
  };

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
                  Expense Report
                </Typography>
              </div>

              <div
                style={{
                  width: "800px",
                  // backgroundColor: '#eee',
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  gap: 2,
                }}
              >
                <FormControl
                  className=""
                  style={{
                    width: "800px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Expense ID
                  </FormLabel>
                  <Input
                    type="text"
                    name="expense_id"
                    value={formik.values.expense_id}
                    onChange={formik.handleChange}
                    placeholder="Enter the ID of the expense"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.expense_id && formik.touched.expense_id && (
                    <p className="input-error">{formik.errors.expense_id}</p>
                  )}
                </FormControl>

                <div
                  style={{
                    width: "100vw",
                    marginBottom: "20px",
                    borderBottomWidth: "1px",
                    borderBottomColor: "#ddd",
                    borderBottomStyle: "solid",
                  }}
                >
                  <Typography
                    component="h2"
                    id="recipient-title"
                    level="h6"
                    textColor="inherit"
                    fontWeight="lg"
                    textAlign="left"
                    mb={1}
                  >
                    Recipient Information
                  </Typography>
                </div>
                {/* //   TODO:
  //   PaymentDate: DateTime
  //   Approval date: DateTime (not initialising date)
  //   Amount: Float
  //   Description: String
  //   Category: Enum [admin, food, venue, prizes, misc, it, advertising, merch, gifts]
  //   Event: Enum [Industry Connect, Codebrew, Catalyst, DiversTEA, Other] (indication for form only)
  //   Event: String
  //   receiptURL: string
  //   Approver: [string (UserID or Name)]
  //   isReimbursement: boolean */}
                <FormControl
                  className=""
                  style={{
                    width: "800px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Payment Date
                  </FormLabel>
                  <Input
                    type="text"
                    name="abn"
                    value={formik.values.abn}
                    onChange={formik.handleChange}
                    placeholder="Enter something"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.abn && formik.touched.abn && (
                    <p className="input-error">{formik.errors.abn}</p>
                  )}
                </FormControl>
                <FormControl
                  className=""
                  style={{
                    width: "800px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Approval date
                  </FormLabel>
                  <Input
                    type="text"
                    name="abn"
                    value={formik.values.abn}
                    onChange={formik.handleChange}
                    placeholder="Enter something"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.abn && formik.touched.abn && (
                    <p className="input-error">{formik.errors.abn}</p>
                  )}
                </FormControl>
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
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Amount
                  </FormLabel>
                  <Input
                    type="text"
                    name="recipient"
                    value={formik.values.recipient}
                    onChange={formik.handleChange}
                    placeholder="Enter something"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.recipient && formik.touched.recipient && (
                    <p className="input-error">{formik.errors.recipient}</p>
                  )}
                </FormControl>

                <FormControl
                  className=""
                  style={{
                    width: "800px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Description
                  </FormLabel>
                  <Input
                    type="text"
                    name="abn"
                    value={formik.values.abn}
                    onChange={formik.handleChange}
                    placeholder="Enter something"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.abn && formik.touched.abn && (
                    <p className="input-error">{formik.errors.abn}</p>
                  )}
                </FormControl>
                <FormControl
                  className=""
                  style={{
                    width: "800px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Category
                  </FormLabel>
                  <Input
                    type="text"
                    name="abn"
                    value={formik.values.abn}
                    onChange={formik.handleChange}
                    placeholder="Enter something"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.abn && formik.touched.abn && (
                    <p className="input-error">{formik.errors.abn}</p>
                  )}
                </FormControl>
                <FormControl
                  className=""
                  style={{
                    width: "800px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Event
                  </FormLabel>
                  <Input
                    type="text"
                    name="abn"
                    value={formik.values.abn}
                    onChange={formik.handleChange}
                    placeholder="Enter something"
                    className="input-box-container input-reset"
                    style={{ width: "300px" }}
                  />
                  {formik.errors.abn && formik.touched.abn && (
                    <p className="input-error">{formik.errors.abn}</p>
                  )}
                </FormControl>

                <FormControl
                  className=""
                  style={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    receiptURL
                  </FormLabel>
                  <Input
                    type="text"
                    name="recipientAddress"
                    value={formik.values.recipientAddress}
                    onChange={formik.handleChange}
                    placeholder="Enter a some text"
                    className="input-box-container input-reset"
                    style={{ width: "650px" }}
                  />
                  {formik.errors.recipientAddress &&
                    formik.touched.recipientAddress && (
                      <p
                        className="input-error"
                        style={{ width: "100vw", paddingLeft: "140px" }}
                      >
                        {formik.errors.recipientAddress}
                      </p>
                    )}
                </FormControl>
                <FormControl
                  className=""
                  style={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    Approver
                  </FormLabel>
                  <Input
                    type="text"
                    name="recipientAddress"
                    value={formik.values.recipientAddress}
                    onChange={formik.handleChange}
                    placeholder="Enter a some text"
                    className="input-box-container input-reset"
                    style={{ width: "650px" }}
                  />
                  {formik.errors.recipientAddress &&
                    formik.touched.recipientAddress && (
                      <p
                        className="input-error"
                        style={{ width: "100vw", paddingLeft: "140px" }}
                      >
                        {formik.errors.recipientAddress}
                      </p>
                    )}
                </FormControl>
                <FormControl
                  className=""
                  style={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FormLabel
                    className=""
                    style={{ width: "130px", lineHeight: "38px" }}
                  >
                    isReimbursement
                  </FormLabel>
                  <Input
                    type="text"
                    name="recipientAddress"
                    value={formik.values.recipientAddress}
                    onChange={formik.handleChange}
                    placeholder="Enter a some text"
                    className="input-box-container input-reset"
                    style={{ width: "650px" }}
                  />
                  {formik.errors.recipientAddress &&
                    formik.touched.recipientAddress && (
                      <p
                        className="input-error"
                        style={{ width: "100vw", paddingLeft: "140px" }}
                      >
                        {formik.errors.recipientAddress}
                      </p>
                    )}
                </FormControl>
                {error && <p className="submit-error">{error}</p>}
              </div>

              <div
                className=""
                style={{
                  textAlign: "right",
                  // paddingRight: '20px',
                  marginTop: "30px",
                  marginBottom: "20px",
                  width: "100vw",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopWidth: "1.5px",
                  borderTopColor: "#ccc",
                  borderTopStyle: "solid",
                  paddingTop: "20px",
                }}
              >
                <Button
                  type="submit"
                  loading={isUploading}
                  color="primary"
                  variant="solid"
                >
                  Generate
                </Button>
              </div>
            </Sheet>
          </div>
        </form>
      )}
    </>
  );
}
