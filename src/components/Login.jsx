import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/user/apiMethod';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccuss } from '../utils/context/authSlice';

function Login() {

  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  },[user, navigate])

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submit = (values) => {
    console.log(values);
    login(values)
      .then((response) => {
        const data = response.data
        console.log("login response data",data);
        if(response.status === 200) {
          toast.success(data.message)
          dispatch(loginSuccuss({user: data}))
          navigate('/')
        } 
      })
      .catch((error) => {
        toast.error(error?.message)
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <p className="text-center mb-4 text-gray-600">Create and manage all your passwords securely.</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          <Form>
            <div className="mb-6 relative">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-xs absolute top-full left-0 mt-1" />
            </div>
            <div className="mb-8 relative">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-xs absolute top-full left-0 mt-1" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </Form>
        </Formik>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
