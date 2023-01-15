import { Fragment } from 'react'

export function UserReviewPreview({ review }) {
    console.log('review:', review)
    return <Fragment>
        <h3>{review.by.fullname}</h3>
        <p>{review.txt}</p>
    </Fragment>
}