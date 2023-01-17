// import { useEffect } from 'react'
// import {useSelector} from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { loadUser } from '../store/user.actions'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { UserReview, UserReviewList } from '../cmp/user-review-list'
import { loadUser } from '../store/actions/user.action'

export function UserDetails() {
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const { userId } = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)

  useEffect(() => {
    loadUser(userId)
    getUserReviews()
  }, [])

  function getUserReviews() {
    return reviews.filter(review => review.byUser._id === userId)
  }


  return <section className="user-details">
    <h1>User Details</h1>
    {user && <div>
      {user.imgUrl && <img className='user-img' src={user.imgUrl} />}
      <h3>
        {user.fullname}
      </h3>
      {/* Demo for dynamic images: */}
      {/* <div className="user-img" style={{ backgroundImage: `url('/img/u${0}.png')` }}> */}
      {/* </div> */}

      <hr />
      <div className='show-review-section'>
        {(!reviews.length) ? <h3>No reviews yet</h3> : <UserReviewList reviews={reviews} />}
      </div>


      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>}
  </section>

}