import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Formik, Form, Field } from "formik";

export function AdminProfile() {
  const [initialValues, setInitialValues] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [cookies] = useCookies(["email"]);
  const decodedEmail = decodeURIComponent(cookies.email);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/getUsersByEmail/${decodedEmail}`)
      .then((response) => setInitialValues(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [decodedEmail]);

  const handleUpdate = async (values) => {
    await axios
      .put(`http://localhost:4000/api/update/${decodedEmail}`, values)
      .then((response) => {
        setInitialValues(response.data);
        alert("Profile updated successfully");
        setEditMode(false);
      })
      .catch((error) => {
        alert("Update failed");
        console.error("Update error:", error);
      });
  };

  return (
    <div className="bg-light m-3 p-3 w-100 d-flex justify-content-between">
      <div className="w-75">
        <h2>Details</h2>

        {editMode && initialValues ? (
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleUpdate}
          >
            {({ dirty, handleChange, values, setFieldValue }) => (
              <Form>
                <div className="mb-2">
                  <label>First Name</label>
                  <Field
                    name="firstName"
                    className="form-control"
                    onChange={handleChange}
                    value={values.firstName}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Last Name</label>
                  <Field
                    name="lastName"
                    className="form-control"
                    onChange={handleChange}
                    value={values.lastName}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Email</label>
                  <Field
                    name="email"
                    className="form-control"
                    value={values.email}
                    disabled
                  />
                </div>
                <div className="mb-2">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    value={values.password}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Address</label>
                  <Field
                    name="address"
                    className="form-control"
                    onChange={handleChange}
                    value={values.address}
                  />
                </div>
                <div className="mb-2">
                  <label>Phone</label>
                  <Field
                    name="phone"
                    className="form-control"
                    onChange={handleChange}
                    value={values.phone}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Profile Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue("photo", reader.result);
                      };
                      if (file) reader.readAsDataURL(file);
                    }}
                  />
                </div>

                <button
                  className="btn btn-success me-2"
                  type="submit"
                  disabled={!dirty}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            {initialValues && (
              <>
                <dl>
                  <dt>First Name</dt>
                  <dd>{initialValues.firstName}</dd>
                  <dt>Last Name</dt>
                  <dd>{initialValues.lastName}</dd>
                  <dt>Email</dt>
                  <dd>{initialValues.email}</dd>
                  <dt>Address</dt>
                  <dd>{initialValues.address}</dd>
                  <dt>Mobile</dt>
                  <dd>{initialValues.phone}</dd>
                </dl>
                <button
                  className="btn btn-warning bi bi-pen-fill"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              </>
            )}
          </>
        )}
      </div>

      <div className="w-25 text-center">
        <img
          src={initialValues?.photo || "https://via.placeholder.com/150"}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
          alt="Profile"
          className="img-thumbnail rounded-circle"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <p className="mt-2">Profile Picture</p>
      </div>
    </div>
  );
}
