// import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react"
// import Select from "react-select";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export function ReviewForm({ review, setReview, addToyReview }) {

    const ReviewSchema = Yup.object().shape({
        // txt: Yup.string()
        //     .min(2, 'Too Short!')
        //     .max(20, 'Too Long!')
        //     .required('Required')
    })

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setReview(prevReview => {
            return { ...prevReview, [field]: value }
        })
    }

    return <Formik
        initialValues={{
            txt: ''
        }}
        validationSchema={ReviewSchema}
    >
        {({ errors, touched }) => (
            <Form className='msg-form'
            // onSubmit={addToyMsg}
            >
                <Field
                    name="txt"
                    id="txt"
                    value={review.txt}
                    onChange={handleChange}
                    placeholder="Your Review"
                />
                {errors.txt && touched.txt ? (
                    <span>{errors.txt}</span>
                ) : null}

                <button onClick={addToyReview}>Add Toy Review</button>
            </Form>
        )}
    </Formik>
}