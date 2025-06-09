import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

export function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
      phone: yup
        .string()
        .required("Mobile is required")
        .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    }),

    onSubmit: async (user) => {
      console.log("Form submitted with values:", user);
      await axios
        .post("http://192.168.0.116:3000/api/signup", user)
        .then(() => {
          alert("Registration successful");
          navigate("/login");
        })
        .catch((res) => {
          //console.error("Registration failed:", res.response.data.message);
          alert(res.response.data.message || "Registration failed");
        });
    },
  });

  return (
    <div className="container py-5">
      <div
        className="row shadow-lg rounded-4 overflow-hidden"
        style={{ minHeight: "500px" }}
      >
        {/* Left Side Image */}
        <div className="col-md-6 d-none d-md-block pt-5">
          <img
            src="RT.png"
            alt="Register Visual"
            className="img-fluid h-90 w-90"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-6 bg-white p-4 w-50">
          <h3 className="text-center text-primary mb-4 fw-bold">
            User Registration
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submit event triggered");
              formik.handleSubmit(e);
            }}
          >
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className={`form-control ${
                  formik.touched.phone && formik.errors.phone
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="invalid-feedback">{formik.errors.phone}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none">
              Already have an account? Login
            </Link>
            <br />
            <Link to="/" className="text-decoration-none">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
