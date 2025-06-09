import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export function ResetPassword() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    firstName: yup.string().required("First Name is required"),
    newPassword: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required("New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (user) => {
      console.log("Form submitted with values:", user);
      const response = await axios.put(
        "http://192.168.0.116:3000/api/resetPassword",
        user
      );
      console.log(response.data.message);
      alert("Password reset successful. Please login with your new password.");
      navigate("/login");
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('/register.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />
      {/* Form container */}
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "90%",
          zIndex: 1,
          borderRadius: "1rem",
        }}
      >
        <h3 className="mb-4 text-center fw-bold text-primary">
          Reset Password
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submit event triggered");
            formik.handleSubmit(e);
          }}
        >
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={`form-control ${
                formik.touched.firstName && formik.errors.firstName
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder="Enter your first name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className={`form-control ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              placeholder="Enter your new password"
            />
            {formik.touched.NewPassword && formik.errors.NewPassword && (
              <div className="invalid-feedback">
                {formik.errors.NewPassword}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login" className="text-decoration-none">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
