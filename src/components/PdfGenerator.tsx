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
import ArrowBack from "@mui/icons-material/ArrowBack";
import ListItemDecorator, {
  listItemDecoratorClasses,
} from "@mui/joy/ListItemDecorator";
import Box from "@mui/joy/Box";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "./Invoice";
import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useUserStore } from "../stores/user";
export const PdfGenerator = () => {
  const [error] = useState("");
  const [isUploading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [valueInvoiceId, setValueInvoiceId] = useState("");
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
      invoice_id: "",
      recipient: "",
      recipientAddress: "",
      description: "",
      amount: "",
      abn: "",
    },
    // validate(values) {},
    enableReinitialize: true,
    validationSchema: Yup.object({
      abn: Yup.string()
        // .required("Must enter ABN")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(11, "Must be exactly 11 digits")
        .max(11, "Must be exactly 11 digits"),

      invoice_id: Yup.string().required("Must enter invoice id/number"),
      recipient: Yup.string().required("Must enter invoice recipient"),
      recipientAddress: Yup.string(),
      // .required(
      //   "Must enter invoice recipient address"
      // ),
    }),

    onSubmit: async (values) => {
      const { invoice_id, recipient, recipientAddress, abn } = values;
      setValueInvoiceId(invoice_id);
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
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    // alert(123);
    // formik.validateField('description');
    // formik.validateField('amount');
    let validatePass = true;
    if (formik.values.amount.trim().length === 0) {
      validatePass = false;
      formik.errors.amount = "Must enter amount of money that invoice request";
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
      formik.errors.description = "Must enter invoice description";
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
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
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
        <div className="app-form-page">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              width: "100%",
            }}
          >
            <IconButton
              aria-label="Back to dashboard"
              variant="soft"
              color="neutral"
              onClick={() => navigate("/dashboard")}
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
                      Billing workflow
                    </Typography>
                    <Typography
                      level="h2"
                      className="app-form-title"
                      sx={{
                        fontSize: { xs: "1.6rem", md: "2rem" },
                        color: "#fff",
                      }}
                    >
                      Invoice
                    </Typography>
                    <Typography
                      level="body1"
                      className="app-form-subtitle"
                      sx={{ color: "#fff" }}
                    >
                      Build the same invoice data with a more structured form
                      surface.
                    </Typography>
                  </div>
                  <div className="app-stat-chip" style={{ color: "#fff" }}>
                    {valueItems.length} items
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
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
                      sx={{ color: "#fff" }}
                    >
                      Invoice ID/Number
                    </FormLabel>
                    <Input
                      type="text"
                      name="invoice_id"
                      value={formik.values.invoice_id}
                      onChange={formik.handleChange}
                      placeholder="Enter the ID of the invoice"
                      className="input-box-container input-reset"
                      style={{ width: "300px" }}
                    />
                    {formik.errors.invoice_id && formik.touched.invoice_id && (
                      <p className="input-error">{formik.errors.invoice_id}</p>
                    )}
                  </FormControl>
                  <div className="app-section-divider">
                    <Typography
                      component="h2"
                      id="recipient-title"
                      level="h4"
                      textColor="inherit"
                      fontWeight="lg"
                      textAlign="left"
                      mb={1}
                      sx={{ color: "#fff" }}
                    >
                      Recipient Information
                    </Typography>
                  </div>
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
                      sx={{ color: "#fff" }}
                    >
                      Recipient ABN
                    </FormLabel>
                    <Input
                      type="text"
                      name="abn"
                      value={formik.values.abn}
                      onChange={formik.handleChange}
                      placeholder="Enter a recipient ABN"
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
                      sx={{ color: "#fff" }}
                    >
                      Recipient
                    </FormLabel>
                    <Input
                      type="text"
                      name="recipient"
                      value={formik.values.recipient}
                      onChange={formik.handleChange}
                      placeholder="Enter the name of the invoice recipient"
                      className="input-box-container input-reset"
                      style={{ width: "450px" }}
                    />
                    {formik.errors.recipient && formik.touched.recipient && (
                      <p className="input-error">{formik.errors.recipient}</p>
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
                      sx={{ color: "#fff" }}
                    >
                      Recipient Address
                    </FormLabel>
                    <Input
                      type="text"
                      name="recipientAddress"
                      value={formik.values.recipientAddress}
                      onChange={formik.handleChange}
                      placeholder="Enter a recipientAddress"
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
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    borderBottomWidth: "1px",
                    borderBottomColor: "rgba(103, 232, 249, 0.14)",
                    borderBottomStyle: "solid",
                    marginTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <div className="app-section-divider">
                    <Typography
                      component="h2"
                      id="items-title"
                      level="h4"
                      textColor="inherit"
                      fontWeight="large"
                      textAlign="left"
                      mb={1}
                      sx={{ color: "#fff" }}
                    >
                      Invoice Items
                    </Typography>
                  </div>
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
                      style={{ width: "80px", lineHeight: "38px" }}
                      sx={{ color: "#fff" }}
                    >
                      Description
                    </FormLabel>
                    <Input
                      id="text_item_description"
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      // validate={validateDescription}
                      placeholder="Enter description"
                      className="input-box-container input-reset"
                      style={{ width: "500px" }}
                    />
                    {formik.errors.description &&
                      formik.touched.description && (
                        <p className="input-error">
                          {formik.errors.description}
                        </p>
                      )}
                  </FormControl>
                  <FormControl
                    className=""
                    style={{
                      width: "450px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel
                      className=""
                      style={{
                        width: "80px",
                        lineHeight: "38px",
                        // fontSize: '0.8rem',
                      }}
                      sx={{ color: "#fff" }}
                    >
                      Amount
                    </FormLabel>
                    <Input
                      id="text_item_amount"
                      type="text"
                      name="amount"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      // validate={validateAmont}
                      placeholder="Enter amount"
                      className="input-box-container input-reset"
                      // style={{ width: '200px' }}
                    />
                    {formik.errors.amount && formik.touched.amount && (
                      <p className="input-error">{formik.errors.amount}</p>
                    )}
                  </FormControl>
                  <div
                    className=""
                    style={{
                      textAlign: "left",
                      // width: '180px',
                    }}
                  >
                    <Button
                      type="button"
                      id="btnAdd"
                      // className="soft-buttton"
                      color="warning"
                      variant="solid"
                      onClick={addItemHandle}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      py: 2,
                      pr: 0,
                      width: { xs: "100%", md: 520 },
                      backgroundColor: "transparent",
                    }}
                  >
                    <List
                      aria-label="Sidebar"
                      variant="outlined"
                      sx={{
                        // ...applyRadiusOnEdges({ target: 'deepest' | 'nested' }),
                        "--ListItem-paddingLeft": "0px",
                        "--ListItemDecorator-size": "48px",
                        "--ListItemDecorator-color": (theme) =>
                          theme.vars.palette.text.secondary,
                        "--ListItem-minHeight": "36px",
                        "--List-nestedInsetStart": "13px",
                        [`& .${listItemDecoratorClasses.root}`]: {
                          justifyContent: "flex-end",
                          pl: "10px",
                          pr: "10px",
                        },
                        '& [role="button"]': {
                          // borderRadius: '0 20px 20px 0',
                        },
                        bgcolor: "rgba(8, 15, 29, 0.72)",
                        borderRadius: "18px",
                        boxShadow: "sm",
                        minHeight: 50,
                        py: 2,
                      }}
                    >
                      {valueItems.map((item) => {
                        return (
                          <ListItem
                            key={uuidv4()}
                            endAction={
                              <IconButton
                                aria-label="Delete"
                                size="sm"
                                color="danger"
                                onClick={deleteItemHandle}
                              >
                                <Delete />
                              </IconButton>
                            }
                            sx={{
                              marginBottom: "0px",
                              paddingBottom: "10px",
                              // borderBottomWidth: '0.5px',
                              // borderBottomColor: '#ddd',
                              // borderBottomStyle: 'dashed',
                            }}
                          >
                            <ListItemButton
                              onClick={() => {}}
                              sx={{
                                backgroundColor: "transparent",
                                "&:hover": { backgroundColor: "transparent" },
                              }}
                            >
                              <ListItemDecorator>
                                <Star fontSize="small" />
                              </ListItemDecorator>
                              <ListItemContent sx={{ pl: 0, color: "#fff" }}>
                                {item.description}
                              </ListItemContent>
                              <Typography
                                level="body2"
                                sx={{
                                  fontWeight: "bold",
                                  color: "#fff",
                                  pr: 2,
                                }}
                              >
                                {item.amount}
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </div>
                <div
                  className="app-form-actions"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      minWidth: "220px",
                      textAlign: "left",
                      color: "#fff",
                    }}
                  >
                    <label>
                      <b>Total Amount:</b>
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                      {valueTotalAmount}
                    </label>
                  </div>
                  <Button
                    type="submit"
                    loading={isUploading}
                    color="primary"
                    variant="solid"
                    sx={{ borderRadius: 999, px: 3, color: "#041014" }}
                  >
                    Generate
                  </Button>
                </div>
              </Sheet>
            </form>
          </div>
        </div>
      )}
      {isSubmit && (
        <Invoice
          invoice_id={valueInvoiceId}
          recipient={valueRecipient}
          recipient_abn={valueAbn}
          recipient_address={valueRecipientAddress}
          items={valueItems}
          total_amount={valueTotalAmount}
        />
      )}
    </>
  );
};
