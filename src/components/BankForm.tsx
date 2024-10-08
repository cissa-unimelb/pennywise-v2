import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, {useContext, useEffect, useState} from 'react';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {getUser, setUser} from "../database";
import {UserContext} from "../stores/user";

import './bankform.css'



export function BankForm(){
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { user, setUser: setUserContext } = useContext(UserContext);

  const [open, setOpen] = React.useState<boolean>(false);

  // Try to retrieve bank account if first login
  useEffect(() => {
    // this is only going to be empty if we've first logged in
    if (user.bsb == null) {
      getUser(user.id)
        .then(newUser => {
          // already has the data, we are done
          setUserContext({
            ...user,
            ...newUser
          });
          setOpen(false);
        })
        .catch(err => {
          // no user found
          setOpen(true);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserContext]);


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
        user.accountNum = values.accountNumber;
        user.bsb = values.bsb;

        setUser(user)
        .then(()=>{

          setError('');
          setUserContext(user);
          console.log('successful');
          // console.log(user);
          toast("Bank details successfully saved!");
          setOpen(false);


        }).catch((err)=>{
          setIsUploading(false);
          console.log(err);
          setError(err.message);
        })

      ///
      // call update user bank details api and handle error here
      ///
      setIsUploading(false);
    }
  });
    return (
    <div>
      {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button> */}
      <ToastContainer />
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          className = 'sheet'
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            justifyContent="center"
            mb={1}
          >
            Bank Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt3">
              <label className="black">Name</label>
              <Input
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
              <Input
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
              <Input
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
            <div className="button-container">
              <Button type="submit" id="login" className="solid-buttton" loading = {isUploading}>
                Submit
              </Button>
              <br />
            </div>
          </form>
        </Sheet>
      </Modal>

    </div>
  );
}