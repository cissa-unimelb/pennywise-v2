import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';


export function BankForm(){
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      bsb: "",
      accountNumber: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      bsb: Yup.string().required("Must enter BSB").matches(/^[0-9]+$/, "Must be only digits").min(6, 'Must be exactly 6 digits').max(6, 'Must be exactly 6 digits'),
      name: Yup.string().required('Must enter the name of account owner'),
      accountNumber: Yup.string().required("Must enter Account Number").matches(/^[0-9]+$/, "Must be only digits").min(6, 'Must be at least 6 digits').max(9, 'Must be at most 9 digits')
    }),
    onSubmit: async (values) => {
      setIsUploading(true);
      // console.log(values);
      alert(JSON.stringify(values, null, 2));

      ///
      // call update user bank details api and handle error here
      ///
      setIsUploading(false);
    }
  });
    return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt3">
          <label className="black">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter the name of the bank account owner"
            className="input-box-container input-reset"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="input-error">{formik.errors.name}</p>
          )}
        </div>
        <div className="mt3">
          <label className="black">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            placeholder="Enter a accountNumber"
            className="input-box-container input-reset"
          />
          {formik.errors.accountNumber && formik.touched.accountNumber && (
            <p className="input-error">{formik.errors.accountNumber}</p>
          )}
        </div>
        <div className="mt3">
          <label className="black">BSB</label>
          <input
            type="text"
            name="bsb"
            value={formik.values.bsb}
            onChange={formik.handleChange}
            placeholder="Enter BSB"
            className="input-box-container input-reset"
          />
          {formik.errors.bsb && formik.touched.bsb && (
            <p className="input-error">{formik.errors.bsb}</p>
          )}
        </div>
        {error && <p className="submit-error">{error}</p>}
        <div className="loadingIcon">
          {/* <p style={{visibility: isUploading  ? "visible" : "hidden"}}>Loading...</p> */}
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isUploading}
          />
        </div>
        <div className="button-container">
          <button type="submit" id="login" className="solid-buttton">
            Submit
          </button>
          <br />
        </div>
      </form>
    </div>
  );
}