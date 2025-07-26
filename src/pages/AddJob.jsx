import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

// ✅ Use environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL;

function AddJob() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    company: "",
    type: "",
    location: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company name is required"),
    type: Yup.string().required("Job type is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().min(10, "Description too short").required("Description is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // ✅ Use API_BASE_URL here
      await axios.post(`${API_BASE_URL}/jobs`, values);
      resetForm();
      navigate("/");
    } catch (err) {
      alert("Error submitting job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <h2 className="mb-4">Add New Job</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Job Title</label>
              <Field name="title" className="form-control" placeholder="Job Title" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Company</label>
              <Field name="company" className="form-control" placeholder="Company" />
              <ErrorMessage name="company" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Job Type</label>
              <Field as="select" name="type" className="form-select">
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Location</label>
              <Field name="location" className="form-control" placeholder="Location" />
              <ErrorMessage name="location" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <Field as="textarea" name="description" className="form-control" placeholder="Description" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Add Job
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddJob;
