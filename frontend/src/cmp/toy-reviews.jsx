// import { loadReviews, addReview, removeReview } from '../store/review.actions'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadReviews } from '../store/actions/review.actions'

export function ToyReviews({ toy }) {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews()
    }, [])

    function getToyReviews() {
        return reviews.filter(review => review.aboutToy._id === toy._id)
    }

    return <section className="toy-reviews">
        {reviews && <ul className="review-list">
            {getToyReviews().map(review => (
                <li key={review._id}>
                    <h3>{review.txt}</h3>
                    <p>
                        By:
                        {review.byUser && <span>{review.byUser.fullname}</span>}
                    </p>
                    <hr />
                </li>
            ))}
        </ul>}
    </section>
}