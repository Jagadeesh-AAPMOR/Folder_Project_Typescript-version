import React, { useRef, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Define types for form errors and login details
interface FormErrors {
  email?: string;
  otp?: string;
}

interface LoginDetails {
  email: string;
  otp: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [getOtp, setGetOtp] = useState<boolean>(false);
  const length: number = 6;
  const [otp, setOTP] = useState<string[]>(new Array(length).fill(""));
  const otpFields = useRef<(HTMLInputElement | null)[]>([]);
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    otp: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOTPChange = (otp: string) => {
    setLoginDetails((prevState) => ({ ...prevState, otp }));
  };

  const validate = (values: LoginDetails): FormErrors => {
    const errors: FormErrors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation for email
    if (!values.email) {
      errors.email = "Field is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    } else if (
      values.email.startsWith(".") ||
      values.email.includes("..") ||
      values.email.startsWith("@") ||
      values.email.endsWith(".") ||
      values.email.includes(" ")
    ) {
      errors.email = "Invalid email format";
    } else if (
      !values.email.includes("@") ||
      values.email.lastIndexOf("@") !== values.email.indexOf("@")
    ) {
      errors.email = "Invalid email format";
    }

    // Validation for OTP
    if (!values.otp) {
      errors.otp = "* Field is required";
    } else if (!/^\d+$/.test(values.otp)) {
      errors.otp = "OTP must contain only digits";
    } else if (values.otp.length !== 6) {
      errors.otp = "OTP must be 6 digits long";
    }

    return errors;
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = event.target.value;
    if (isNaN(Number(value))) return;
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
  
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  
    if (value !== "" && index < length - 1) {
      otpFields.current[index + 1]?.focus();
    }
  
    const newCombinedOTP = newOTP.join("");
    handleOTPChange(newCombinedOTP);
  };
  
//   const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     let value = event.target.value;
//     if (isNaN(Number(value))) return;
//     if (value.length > 1) {
//       value = value.slice(0, 1);
//     }

//     const newOTP = [...otp];
//     newOTP[index] = value;
//     setOTP(newOTP);

//     if (value !== "" && index < length - 1) {
//       otpFields.current[index + 1]?.focus();
//     }

//     const newCombinedOTP = newOTP.join("");
//     handleOTPChange(newCombinedOTP);
//   };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text");
    if (!/^\d{6}$/.test(pasteData)) return;

    const newOTP = pasteData.split("");
    setOTP(newOTP);
    handleOTPChange(pasteData);
    otpFields.current.forEach((field, index) => {
      if (field) {
        field.value = newOTP[index];
      }
    });
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      otpFields.current[index - 1]?.focus();
    }
  };

  

  const handleGetOTP = async () => {
    const errors = validate(loginDetails);
    setGetOtp(true);
  };

  const handleSubmitOTP = async () => {
    const errors = validate(loginDetails);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      Cookies.set("loginDetails", JSON.stringify(loginDetails), { expires: 1 / 12 });
      console.log("Cookies set:", Cookies.get("loginDetails"));
      console.log(loginDetails);
      navigate("/");
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <Stack>
      <Typography variant="h6" fontWeight={600} m={"auto"}>
        FOLDER AUTHENTICATION
      </Typography>

      {!getOtp ? (
        <>
          <Typography m={"auto"} pt={5}>
            Login with your email
          </Typography>
          <TextField
            type="email"
            name="email"
            value={loginDetails.email}
            helperText={formErrors.email}
            FormHelperTextProps={{ style: { color: "red" } }}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            size="small"
            sx={{ width: 300, m: "auto", pt: 5 }}
          />
          <Button
            variant="contained"
            disabled={loginDetails.email.length === 0}
            sx={{
              width: 300,
              m: "auto",
              mt: 5,
              bgcolor: "rgb(49, 38, 228)",
            }}
            onClick={handleGetOTP}
          >
            GET OTP
          </Button>
        </>
      ) : (
        <>
          <Typography m={"auto"} pt={5}>
            Enter the OTP
          </Typography>
          <Stack
            direction={"row"}
            gap={2}
            mt={4}
            textAlign={"center"}
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (otpFields.current[index] = el)}
                variant="outlined"
                name="otp"
                size="small"
                sx={{ width: 50, height: 50 }}
                inputProps={{ style: { textAlign: "center" } }}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </Stack>
          <FormHelperText sx={{ color: "red", fontSize: 12 }}>
            {formErrors.otp}
          </FormHelperText>
          <Typography
            sx={{
              color: "green",
              textAlign: "center",
              mt: 2,
              fontSize: 12,
            }}
          >
            OTP sent to {loginDetails.email}
          </Typography>
          <Button
            onClick={handleSubmitOTP}
            variant="contained"
            sx={{
              width: 300,
              m: "auto",
              mt: 3,
              bgcolor: "rgb(49, 38, 228)",
            }}
          >
            SUBMIT OTP
          </Button>
          <Typography fontSize={15} mt={5}>
            Incorrect Email?{" "}
            <span
              onClick={() => setGetOtp(false)}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Click Here
            </span>
          </Typography>
        </>
      )}
    </Stack>
  );
};
