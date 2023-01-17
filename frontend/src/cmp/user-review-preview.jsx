import { Fragment } from 'react'
import { toyService } from '../services/toy-service'

export function UserReviewPreview({ review }) {
    const { aboutToy } = review
    const toyId = aboutToy._id

    // async function getToy(){
    const toy = toyService.getById(toyId)
    // return 
    // }

    return <Fragment>
        <h3>About : {toy.fullname}</h3>
        <p>{review.txt}</p>
    </Fragment>
}