import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy-service'
import { addReview, loadReviews, removeReview } from '../store/actions/review.actions'
import { loadUsers } from '../store/actions/user.action'

// import { loadReviews, addReview, removeReview } from '../store/review.actions'


export function ReviewApp({ toy }) {

  // const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const [reviewToEdit, setReviewToEdit] = useState(toyService.getEmptyReview())

  useEffect(() => {
    loadReviews()
    // loadUsers()
  }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  async function onAddReview(ev) {
    ev.preventDefault()
    try {
      const savedReview = await addReview(reviewToEdit)
      console.log('savedReview:', savedReview)
      // setToy((prevToy) => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))
      setReviewToEdit(toyService.getEmptyReview())
      showSuccessMsg('Review added')
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  }

  console.log('loggedInUser:', loggedInUser)

  return (
    <div className="review-app">
      <h1>Reviews and Gossip</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}
            {/* <p>
              About:
              <Link to={`/user/${review.aboutUser._id}`}>
                {review.aboutUser.fullname}
              </Link>
            </p> */}
            <h3>{review.txt}</h3>
            <p>
              By:
              <Link to={`/user/${review.byUser._id}`}>
                {review.byUser.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}

      {loggedInUser &&
        <form onSubmit={onAddReview}>
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>}
      <hr />
    </div>
  )
}