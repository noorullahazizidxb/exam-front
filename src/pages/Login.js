import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { login } from '../services/api';
import { toast } from 'react-hot-toast';

const Login = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await login(values);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        history.push('/notifications');
      } catch (error) {
        toast.error('Login failed.');
        console.error(error);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            {...formik.getFieldProps('username')}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            {...formik.getFieldProps('password')}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </motion.div>
  );
};

export default Login;
