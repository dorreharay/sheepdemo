/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import type { FormikErrors, FormikValues } from 'formik';
import './styles.scss'

import { createCatalogueItem } from '../../store/reducers/MainReducer';

import { FormSchema } from './schema'

function AddProduct() {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const formik = useFormik<FormikValues>({
    initialValues: {
      name: '',
      author: '',
      year: '',
      rating: ''
    },
    validationSchema: FormSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
      dispatch(createCatalogueItem(values))
      navigate('/');
    },
  });

  const errors: FormikErrors<FormikValues> = formik.errors

  return (
    <section className='addproductpage'>
      <h1>Add product</h1>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Title</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <div className='error'>{errors?.name as string}</div>
        <label htmlFor="lastName">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.author}
        />
        <div className='error'>{errors?.author as string}</div>
        <label htmlFor="email">Year of publishing</label>
        <input
          id="year"
          name="year"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.year}
        />
        <div className='error'>{errors?.year as string}</div>
        <label htmlFor="email">Rating</label>
        <input
          id="rating"
          name="rating"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.rating}
        />
        <div className='error'>{errors?.rating as string}</div>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default AddProduct;
