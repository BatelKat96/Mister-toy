import { UserReviewPreview } from './user-review-preview';

export function UserReviewList({ reviews }) {
    return <ul className="user-review-list clean-list">
        {reviews.map(review =>
            <li className="review" key={review.id}>
                <UserReviewPreview review={review} />
            </li>)}
    </ul>
}