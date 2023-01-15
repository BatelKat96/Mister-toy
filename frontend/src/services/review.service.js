import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
// import { userService } from './user.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { getActionRemoveReview, getActionAddReview } from '../store/review.actions'
// import { store } from '../store/store'
// import { showSuccessMsg } from '../services/event-bus.service'


export const reviewService = {
    add,
    query,
    remove
}

function query(filterBy) {
    return httpService.get('review', { params: { filterBy } })
}

async function remove(reviewId) {
    await httpService.delete(`review/${reviewId}`)
}

async function add({ txt }) {
    console.log('txt:', txt)

    const addedReview = await httpService.post(`review`, { txt })

    // const aboutUser = await userService.getById(aboutUserId)

    // const reviewToAdd = {
    //     txt,
    //     byUser: userService.getLoggedinUser(),
    //     aboutUser: {
    //         _id: aboutUser._id,
    //         fullname: aboutUser.fullname,
    //         imgUrl: aboutUser.imgUrl
    //     }
    // }

    // reviewToAdd.byUser.score += 10
    // await userService.update(reviewToAdd.byUser)
    // const addedReview = await storageService.post('review', reviewToAdd)
    return addedReview
}