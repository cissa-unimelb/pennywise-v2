import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';

import { checkUserExists, setUser } from "../database";
import { useUserStore } from "../stores/user";

import './bankform.css'


interface Props {
  formId: string;
  display: boolean;
}

export function ExpenseForm({ formId, display }: Props){
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { value, setUserStore } = useUserStore();
  const user = value;

  const [open, setOpen] = React.useState<boolean>(display);

  console.log(user);
  // console.log(value);

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
          setUserStore(user);
          console.log('successful');
          console.log(user);

        }).catch((err)=>{
          setIsUploading(false);
          console.log(err);
          setError(err.message);
        })
          

      alert(JSON.stringify(value, null, 2));

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
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
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
            Expense Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt3">
              <label className="black">Item 1</label>
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="item 1"
                className="input-box-container input-reset"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="input-error">{formik.errors.name}</p>
              )}
            </div>
            <div className="mt3">
              <label className="black">Item 2</label>
              <Input
                type="text"
                name="accountNumber"
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                placeholder="Item 2"
                className="input-box-container input-reset"
              />
              {formik.errors.accountNumber && formik.touched.accountNumber && (
                <p className="input-error">{formik.errors.accountNumber}</p>
              )}
            </div>
            <div className="mt3">
              <label className="black">Item 3</label>
              <Input
                type="text"
                name="bsb"
                value={formik.values.bsb}
                onChange={formik.handleChange}
                placeholder="Item 3"
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