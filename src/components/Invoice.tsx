import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  PDFViewer,
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
  pdf,
} from "@react-pdf/renderer";
import { uploadFile } from "../services/upload";
import { useUserStore } from "../stores/user";
import { Button } from "@mui/joy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const const_images = {
  logo: "/cissa.png",
  club: "/cissa-affiliated-club.jpg",
  charity: "/cissa-registerd-charity.jpg",
  icons: {
    email: "/email.png",
    worktel: "/tel.png",
  },
};

Font.register({
  family: "Dosis",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/dosis/v27/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7MV3BkFTq4EPw.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/dosis/v27/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7QV3BkFTq4EPw.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/arimo/v27/P5sfzZCDf9_T_3cV7NCUECyoxNk37cxsBxDAVQI4aA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/arimo/v27/P5sfzZCDf9_T_3cV7NCUECyoxNk37cxsBxDAVQI4aA.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  pdfViewer: {
    width: "99vw",
    height: "99vh",
    marginHorizontal: "auto",
    marginVertical: "0",
    padding: 0,
  },
  page: {},
  sectionPage: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    padding: "30px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionFoot: {
    marginHorizontal: "auto",
    width: "500px",
    height: "50px",
    position: "absolute",
    bottom: 30,
    right: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionFootBox: {
    width: "500px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sectionFootImage: {
    height: "40px",
    marginLeft: "10px",
  },
  sectionHeader: {
    width: "500px",
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader_icon: {
    width: "168px",
    height: "70px",
  },
  sectionHeader_address: {
    width: "250px",
    lineHeight: 1.5,
    fontFamily: "Dosis",
    fontSize: "8.2px",
    textAlign: "right",
  },
  sectionInvoiceHeader: {
    width: "500px",
    marginHorizontal: "auto",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  sectionInvoiceHeader_label: {
    width: "80px",
    // height: "25px",
    lineHeight: 1.5,
    fontFamily: "Dosis",
    fontSize: "9px",
    fontWeight: "bold",
  },
  sectionInvoiceHeader_value: {
    width: "150px",
    // height: "25px",
    marginLeft: "10px",
    lineHeight: 1.5,
    fontFamily: "Times-Roman",
    fontSize: "9px",
  },
  sectionInvoiceHeader_value_text_italic: {
    fontSize: 9,
    textAlign: "left",
    fontFamily: "Dosis",
    //fontStyle: 'italic',
  },
  sectionItems: {
    width: "500px",
    marginTop: "10px",
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionPayment: {
    width: "500px",
    marginTop: "20px",
    marginHorizontal: "auto",
    paddingTop: "10px",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    fontFamily: "Dosis",
    fontSize: "9px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionContact: {
    width: "500px",
    marginTop: "20px",
    marginHorizontal: "auto",
    paddingTop: "10px",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    fontFamily: "Dosis",
    fontSize: "9px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionItemsLableBox: {
    width: "500px",
    height: "24px",
    borderTopWidth: "0.5px",
    borderBottomWidth: "1px",
    borderColor: "#ccc",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "8px",
    // backgroundColor: '#eee',
  },
  itemDescriptionLabel: {
    width: "350px",
    fontFamily: "Dosis",
    fontSize: "9px",
    fontWeight: "bold",
    paddingLeft: "5px",
    // backgroundColor: '#333',
  },
  itemAmountLabel: {
    width: "150px",
    fontFamily: "Dosis",
    fontSize: "9px",
    fontWeight: "bold",
    // backgroundColor: '#ddd',
  },

  itemsContainer: {
    width: "500px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "5px",
    borderBottomWidth: "0.5px",
    borderColor: "#ccc",
    borderStyle: "solid",
  },
  itemBox: {
    width: "500px",
    height: "20px",
    display: "flex",
    // backgroundColor: '#fff',
    flexDirection: "row",
    alignItems: "center",
  },
  itemDescription: {
    width: "350px",
    height: "20px",
    fontFamily: "Times-Roman",
    fontSize: "9px",
    paddingLeft: "5px",
  },
  itemAmount: {
    width: "140px",
    height: "20px",
    fontFamily: "Times-Roman",
    fontSize: "9px",
  },
  itemTotalBox: {
    width: "500px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  itemTotalLabel: {
    width: "350px",
    height: "20px",
    fontFamily: "Dosis",
    fontSize: "9px",
    fontWeight: "bold",
    paddingRight: "15px",
    textAlign: "right",
  },
  itemTotalValue: {
    width: "140px",
    height: "20px",
    fontFamily: "Times-Roman",
    fontSize: "9px",
    textAlign: "left",
  },
  itemGstBox: {
    fontFamily: "Dosis",
    fontSize: "9px",
  },
  contactContainerTitle: {
    fontFamily: "Arial",
    fontSize: "12px",
    width: "500px",
    marginBottom: "5px",
  },
  contactBox: {
    flexBasis: "155px",
    width: "155px",
    height: "70px",
    fontFamily: "Dosis",
    fontSize: "9px",
    textAlign: "left",
    border: "0.4",
    borderColor: "#ccc",

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactTitleBox: {
    fontWeight: "bold",
    paddingLeft: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    display: "flex",
    flexDirection: "row",
    width: "155px",
    borderBottom: "0.4px",
    borderColor: "#ccc",
    borderStyle: "solid",
  },
  contactTitle: {
    borderRadius: "3px",
    border: "0.6",
    borderColor: "#333",
    borderStyle: "solid",
    fontWeight: "bold",
    fontSize: "7px",
    textAlign: "center",
    marginLeft: "5px",
    paddingLeft: "3px",
    paddingRight: "3px",
    paddingTop: "1px",
  },
  contactEmailBox: {
    paddingLeft: "10px",
    paddingTop: "8px",
    paddingBottom: "4px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    height: "24px",
  },
  contactTelBox: {
    paddingLeft: "10px",
    paddingTop: "4px",
    paddingBottom: "8px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    height: "24px",
  },
  contactIcon: {
    width: "16px",
    height: "16px",
    marginRight: "5px",
  },
  paymentContainerTitle: {
    fontFamily: "Arial",
    fontSize: "12",
    width: "500px",
    marginBottom: "3px",
  },
  paymentItemBox: {
    flexBasis: "240px",
    width: "240px",
    height: "115px",
    fontFamily: "Dosis",
    fontSize: "9px",
    textAlign: "left",
    borderWidth: "0.4px",
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paymentCommentLine: {
    paddingLeft: "10px",
    paddingBottom: "8px",
    width: "240px",
  },
  paymentItemBoxTitle: {
    fontWeight: "bold",
    paddingLeft: "10px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: "240px",
    borderBottom: "0.4px",
    borderColor: "#ccc",
    borderStyle: "solid",
    marginBottom: "8px",
  },
  paymentItemLabel: {
    flexBasis: "100px",
    paddingLeft: "10px",
    height: "15px",
    fontWeight: "bold",
  },
  paymentItemValue: {
    flexBasis: "100px",
    paddingLeft: "10px",
    height: "15px",
  },
});

interface InvoiceProps {
  invoice_id: string;
  recipient: string;
  recipient_abn: string;
  recipient_address: string;
  items: {
    description: string;
    amount: string;
  }[];
  total_amount: string;
}
export default function Invoice(props: InvoiceProps) {
  // const [instance, update] = usePDF({
  //   document: <InvoiceDocument {...props} />,
  // });
  const { value } = useUserStore();
  const [isUploading, setIsUploading] = useState(false);
  console.log("user:", value);
  const upload = async () => {
    setIsUploading(true);
    const blob = await pdf(<InvoiceDocument {...props} />).toBlob();
    console.log(blob);
    var file = new File([blob], props.invoice_id + ".pdf", {
      lastModified: new Date().getTime(),
    });
    uploadFile(file, value.token)
      .then(onUploadComplete);
  };
  const onUploadComplete = (url: string) => {
    console.log(url);
    toast("Successfully uploaded to Google Drive!");
    window.open(url, "file");
    setIsUploading(false);
  };
  return (
    <>
      <>
        <div className="Component-pdfupload-container">
          <Button size="lg" loading={isUploading} onClick={upload}>
            Upload
          </Button>
        </div>

        <PDFViewer style={styles.pdfViewer}>
          <InvoiceDocument {...props}></InvoiceDocument>
        </PDFViewer>
      </>

      <ToastContainer />
    </>
  );
}
export function InvoiceDocument(props: InvoiceProps) {
  // const [uploadProgress, setUploadProgress] = useState(0);

  const invoiceData = {
    Logo: const_images.logo,
    Seller: {
      name: "Computing and Information Systems Students Association (CISSA)",
      abn: "ABN 80 988 105 064",
      address1:
        "School of Computing and Information Systems Level 3, Melbourne Connect (Building 290)",
      address2: "The University of Melbourne, VIC 3010, Australia",
      // province: 'VIC',
      // postCode: '3010',
      // country: 'Australia',
      url: "https://cissa.org.au",
      urlTitle: "https://cissa.org.au",
    },
    InvoiceHeader: {
      id: "636ddee7332b4d0046990c81",
      issuedOn: "11/11/2022",
      issuedTo: "ANZ Banking Group Ltd (Aust)",
    },
    Buyer: {
      name: "ANZ Banking Group Ltd (Aust)",
      abn: "ABN 11 005 357 522",
      address1: "Level 12, 839 Collins Street, Docklands ",
      address2: "VIC 3008",
      // province: 'VIC',
      // postCode: '3008',
      // country: 'Australia',
    },
    ShipTo: {},
    Details: {
      totalAmout: "",
      items: [{ description: "", amount: "0.00" }],
    },
    PaymentInfo: {
      onlinePayment: [
        "To arrange payment via International Transfer, Credit Card or PayPal, please contact us via the details below.",
        "Please note that payment surcharges may apply",
      ],
      australianBankTransfer: {
        accountName: "CISSA",
        bankName: "NAB",
        swiftCode: "NATAAU3303M",
        bsb: "083 170",
        accountNumber: "798 460 849",
      },
    },
    ContactInfo: {
      tips: "if you have any questions/concerns regarding this invoice, please contact:",
      contact1: {
        name: "Cinque Howells",
        title: "President",
        email: "president@cissa.org.au",
        worktel: "+61 435 087 999",
      },
      contact2: {
        name: "Jennifer Soo",
        title: "Treasurer",
        email: "treasurer@cissa.org.au",
        worktel: "+61 405 553 549",
      },
    },
  };
  const now = new Date();
  invoiceData.InvoiceHeader.id = props.invoice_id;
  invoiceData.InvoiceHeader.issuedOn =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  invoiceData.InvoiceHeader.issuedTo = props.recipient;
  invoiceData.Buyer.name = props.recipient;
  invoiceData.Buyer.abn = props.recipient_abn || "";
  invoiceData.Buyer.address1 = props.recipient_address || "";
  invoiceData.Details.items.length = 0;
  props.items.forEach((item) => {
    invoiceData.Details.items.push({
      description: item.description,

      amount: item.amount,
    });
  });
  // amount round to the nearest hundredth

  invoiceData.Details.totalAmout = props.total_amount;

  // const [instance, update] = usePDF({ document: PdfDocument });
  // useEffect(() => {
  //   if (instance && value.token) {
  //     uploadFile(
  //       instance.blob,
  //       GOOGLE_DRIVE_FOLDER_ID,
  //       value.token,
  //       (p: number) => {}
  //     ).then(() => {
  //       alert("successfully uploaded file");
  //     });
  //   }
  // }, [value.token]);
  return (
    <Document pageLayout="singlePage">
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionPage}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeader_icon}>
              <Image source={invoiceData.Logo} />
            </View>
            <View style={styles.sectionHeader_address}>
              <Text>{invoiceData.Seller.name}</Text>
              <Text>{invoiceData.Seller.abn}</Text>
              <Text>&nbsp;</Text>
              <Text>{invoiceData.Seller.address1}</Text>
              <Text>{invoiceData.Seller.address2}</Text>
              <Link src={invoiceData.Seller.url}>
                {invoiceData.Seller.urlTitle}
              </Link>
            </View>
          </View>

          <View style={styles.sectionInvoiceHeader}>
            <View style={styles.sectionInvoiceHeader_label}>
              <Text>Invoice ID/Number:</Text>
            </View>
            <View style={styles.sectionInvoiceHeader_value}>
              <Text>{invoiceData.InvoiceHeader.id}</Text>
            </View>
          </View>

          <View style={styles.sectionInvoiceHeader}>
            <View style={styles.sectionInvoiceHeader_label}>
              <Text>Issued on:</Text>
            </View>
            <View style={styles.sectionInvoiceHeader_value}>
              <Text>{invoiceData.InvoiceHeader.issuedOn}</Text>
            </View>
          </View>

          <View style={styles.sectionInvoiceHeader}>
            <View style={styles.sectionInvoiceHeader_label}>
              <Text>Issued to:</Text>
            </View>
            <View style={styles.sectionInvoiceHeader_value}>
              <Text>{invoiceData.Buyer.name}</Text>
            </View>
          </View>

          <View style={styles.sectionInvoiceHeader}>
            <View style={styles.sectionInvoiceHeader_label}>
              <Text>Address:</Text>
            </View>
            <View style={styles.sectionInvoiceHeader_value}>
              <Text style={styles.sectionInvoiceHeader_value_text_italic}>
                {invoiceData.Buyer.address1}&nbsp;
                {invoiceData.Buyer.address2}&nbsp;
                {invoiceData.Buyer.abn && `(ABN ${invoiceData.Buyer.abn}`}
              </Text>
            </View>
          </View>

          

          <View style={[styles.sectionItems]}>
            <View style={styles.sectionItemsLableBox}>
              <Text style={styles.itemDescriptionLabel}>Description</Text>
              <Text style={styles.itemAmountLabel}>Amount (AUD)</Text>
            </View>

            <View style={styles.itemsContainer}>
              {invoiceData.Details.items.map((item) => (
                <View style={styles.itemBox} key={uuidv4()}>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemAmount}>{item.amount}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.itemTotalBox]}>
              <Text style={styles.itemTotalLabel}>Total:</Text>
              <Text style={styles.itemTotalValue}>
                {invoiceData.Details.totalAmout}
              </Text>
            </View>
            <View style={[styles.itemGstBox]}>
              <Text>Amounts do not include GST.</Text>
            </View>
          </View>

          <View style={[styles.sectionPayment]}>
            <Text style={styles.paymentContainerTitle}>
              Payment Information
            </Text>
            <View style={styles.paymentItemBox}>
              <Text style={styles.paymentItemBoxTitle}>
                Australian Bank Transfer
              </Text>
              <Text style={styles.paymentItemLabel}>Account Name:</Text>
              <Text style={styles.paymentItemValue}>
                {invoiceData.PaymentInfo.australianBankTransfer.accountName}
              </Text>
              <Text style={styles.paymentItemLabel}>Bank Name:</Text>
              <Text style={styles.paymentItemValue}>
                {invoiceData.PaymentInfo.australianBankTransfer.bankName}
              </Text>
              <Text style={styles.paymentItemLabel}>Swift Code:</Text>
              <Text style={styles.paymentItemValue}>
                {invoiceData.PaymentInfo.australianBankTransfer.swiftCode}
              </Text>
              <Text style={styles.paymentItemLabel}>BSB:</Text>
              <Text style={styles.paymentItemValue}>
                {invoiceData.PaymentInfo.australianBankTransfer.bsb}
              </Text>
              <Text style={styles.paymentItemLabel}>Account Number:</Text>
              <Text style={styles.paymentItemValue}>
                {invoiceData.PaymentInfo.australianBankTransfer.accountNumber}
              </Text>
            </View>
            <View style={styles.paymentItemBox}>
              <Text style={styles.paymentItemBoxTitle}>Online Payment</Text>
              <Text style={styles.paymentCommentLine}>
                To arrange payment via International Transfer, Credit Card or
                PayPal, please contact us via the details below.
              </Text>
              <Text style={styles.paymentCommentLine}>
                Please note that payment surcharges may apply.
              </Text>
            </View>
          </View>

          <View style={[styles.sectionContact]}>
            <Text style={styles.contactContainerTitle}>
              Contact Information
            </Text>
            <View style={[styles.contactBox, { border: "0" }]}>
              <Text>
                If you have any questions/concerns regarding this invoice,
                please contact:
              </Text>
            </View>
            <View style={styles.contactBox}>
              <View style={styles.contactTitleBox}>
                <Text>{invoiceData.ContactInfo.contact1.name}</Text>

                <Text style={styles.contactTitle}>
                  {invoiceData.ContactInfo.contact1.title}
                </Text>
              </View>
              <View style={styles.contactEmailBox}>
                <Image
                  src={const_images.icons.email}
                  style={styles.contactIcon}
                />
                <Link src={"mailto:" + invoiceData.ContactInfo.contact1.email}>
                  {invoiceData.ContactInfo.contact1.email}
                </Link>
              </View>

              <View style={styles.contactTelBox}>
                <Image
                  src={const_images.icons.worktel}
                  style={styles.contactIcon}
                />
                <Text>{invoiceData.ContactInfo.contact1.worktel}</Text>
              </View>
            </View>
            <View style={styles.contactBox}>
              <View style={styles.contactTitleBox}>
                <Text>{invoiceData.ContactInfo.contact2.name}</Text>
                <Text style={styles.contactTitle}>
                  {invoiceData.ContactInfo.contact2.title}
                </Text>
              </View>
              <View style={styles.contactEmailBox}>
                <Image
                  src={const_images.icons.email}
                  style={styles.contactIcon}
                />
                <Link src={"mailto:" + invoiceData.ContactInfo.contact2.email}>
                  {invoiceData.ContactInfo.contact2.email}
                </Link>
              </View>
              <View style={styles.contactTelBox}>
                <Image
                  src={const_images.icons.worktel}
                  style={styles.contactIcon}
                />
                <Text>{invoiceData.ContactInfo.contact2.worktel}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionFoot}>
            <View style={styles.sectionFootBox}>
              <Image src={const_images.club} style={styles.sectionFootImage} />
              <Image
                src={const_images.charity}
                style={styles.sectionFootImage}
              />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
