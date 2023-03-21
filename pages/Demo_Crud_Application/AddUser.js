import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
//components
import Forms from "../controls/Forms";
import FormikErrorMessage from "../controls/FormikErrorMessage";
import InputFields from "../controls/InputFields";
import axios from "../../axios";
//function init
const AddUser = ({ setreload, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, seterrorMessage] = useState("");

  //Formik regex
  const Namepattern = /^[a-zA-Z\s.]*$/;
  const mobileregex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  //Formik InitialValue
  const initialvalue = {
    Name: "",
    Mobile_No: "",
    Email_Id: "",
    Amount: "",
  };
  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      Name: Yup.string()
        .required("Enter Your Name")
        .matches(Namepattern, "Alphabets only allowed"),
      Email_Id: Yup.string().required("Plz Type Email_Id"),
      Mobile_No: Yup.string()
        .required("Enter Phone number")
        .matches(mobileregex, "Enter Vaild Mobile Number"),
      Amount: Yup.string().required("Fill Amount"),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.Name,
        mobilenumber: values.Mobile_No,
        emailId: values.Email_Id,
        amount: values.Amount,
      };
      axios
        .post(`/api/posts`, data)
        .then((res) => {
          setreload(!reload);
          onClose();
          formik.resetForm();
        })
        .catch((error) => {
          if (error.response) {
            seterrorMessage(error.response.data.message);
          }
        });
    },
  });
  const cancelbutton = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add User
      </Button>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && (
              <div className="pb-5">
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <Forms className="space-y-2">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Name
                  <span className="text-secondary pb-2">*</span>
                </label>
                <InputFields
                  type="string"
                  name="Name"
                  placeholder="Enter Your Name"
                  value={formik.values.Name || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.Name && formik.errors.Name
                      ? "input-primary ring-2 ring-secondary border-none"
                      : "input-primary"
                  }
                />
              </div>
              {formik.touched.Name && formik.errors.Name ? (
                <FormikErrorMessage>{formik.errors.Name}</FormikErrorMessage>
              ) : null}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Mobile No
                  <span className="text-secondary pb-2">*</span>
                </label>
                <input
                  type="string"
                  name="Mobile_No"
                  placeholder="Enter Your Mobile No"
                  value={formik.values.Mobile_No || ""}
                  onChange={(e) => {
                    e.target.classList.add("change_color");
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.Mobile_No && formik.errors.Mobile_No
                      ? "input-primary ring-2 ring-secondary border-none experience"
                      : "input-primary experience"
                  }
                />
              </div>
              {formik.touched.Mobile_No && formik.errors.Mobile_No ? (
                <FormikErrorMessage>
                  {formik.errors.Mobile_No}
                </FormikErrorMessage>
              ) : null}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  E-mail Id
                  <span className="text-secondary pb-2">*</span>
                </label>
                <InputFields
                  type="string"
                  name="Email_Id"
                  placeholder="Enter Your E-mail"
                  value={formik.values.Email_Id || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.Email_Id && formik.errors.Email_Id
                      ? "input-primary ring-2 ring-secondary border-none"
                      : "input-primary"
                  }
                />
              </div>
              {formik.touched.Email_Id && formik.errors.Email_Id ? (
                <FormikErrorMessage>
                  {formik.errors.Email_Id}
                </FormikErrorMessage>
              ) : null}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Amount
                  <span className="text-secondary pb-2">*</span>
                </label>
                <InputFields
                  type="string"
                  name="Amount"
                  placeholder="Enter Amount"
                  value={formik.values.Amount || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.Amount && formik.errors.Amount
                      ? "input-primary ring-2 ring-secondary border-none"
                      : "input-primary"
                  }
                />
              </div>
              {formik.touched.Amount && formik.errors.Amount ? (
                <FormikErrorMessage>{formik.errors.Amount}</FormikErrorMessage>
              ) : null}
            </Forms>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={cancelbutton}>
              Cancel
            </Button>
            <Button onClick={formik.handleSubmit} colorScheme="green">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddUser;
