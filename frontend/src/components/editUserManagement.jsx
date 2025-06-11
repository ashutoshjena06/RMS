import { useFormik } from "formik";
import axios from "axios";

export function EditUserManagement({ user, onClose }) {
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phone: user.phone,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .put(`http://localhost:4000/api/update/${values.email}`, values)
        .then(() => {
          alert("User updated successfully");
          onClose(values);
        })
        .catch((error) => {
          console.error("Update error:", error);
          alert("Failed to update user");
        });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered");
        formik.handleSubmit(e);
      }}
    >
      <div className="mb-3">
        <label>First Name</label>
        <input
          name="firstName"
          className="form-control"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          name="lastName"
          className="form-control"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          name="email"
          className="form-control"
          value={formik.values.email}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <input
          name="address"
          className="form-control"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Phone</label>
        <input
          name="phone"
          className="form-control"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success me-2">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
