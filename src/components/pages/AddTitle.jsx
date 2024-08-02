import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { savePassword } from '../../services/user/apiMethod';
import { toast } from 'sonner';

function AddTitle({ onClose, password }) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required('Title is required'),
  });

  const selectUser = (state) => state.auth.user
  const user = useSelector(selectUser)
 
  const handleSave = (values, {resetForm}) => {
    const userId = user._id
    const passwordTitle = values.title
    savePassword({userId, password, passwordTitle})
    .then((response) => {
      const data = response.data
      if(response.status === 200) {
        toast.success(data.message)
        resetForm()
        onClose()
        }
      })
      .catch((error) => {
        toast.error(error?.message)
        resetForm()
        onClose()
      })
  }

  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-blur-md'>
      <div className='flex justify-center items-center h-full'>
        <div className='bg-white p-10 space-y-4 w-full max-w-xl rounded-md'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-xl'>Add a title</h2>
            <button onClick={onClose} className="text-gray-800 dark:text-white px-2 py-2 rounded">
              <svg className="w-6 h-6 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
            </button>
          </div>

          <span className="flex border-t border-gray-400 mb-2"></span>

          <Formik
            initialValues={{ title: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {() => (
              <Form className='max-w-md mx-auto space-y-6'>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <Field
                      name="title"
                      type="text"
                      placeholder="Enter title"
                      className='w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <div className='h-5'> {/* Fixed height for error messages */}
                      <ErrorMessage name="title" component="div" className="text-red-600 text-xs" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddTitle;
