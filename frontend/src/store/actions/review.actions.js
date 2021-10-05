import { reviewService } from '../../services/review.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

export function loadReviews(filterBy = null) {
  return async dispatch => {
    try {
      dispatch({ type: 'SET_LOADER' })
      const reviews = await reviewService.query(filterBy)
      dispatch({ type: 'SET_REVIEWS', reviews })
      // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) =>{
      //   dispatch({ type: 'ADD_REVIEW', review })
      // })
    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    } finally {
      dispatch({ type: 'SET_LOADER' })
    }
  }
}

export function addReview(toyId, review) {
  return async dispatch => {
    try {
      const addedReview = await reviewService.add(toyId, review)
      dispatch({ type: 'ADD_REVIEW', review: addedReview })
    } catch (err) {
      console.log('ReviewActions: err in addReview', err)
    }
  }
}

export function deleteReview(reviewId) {
  return async dispatch => {
    try {
      await reviewService.remove(reviewId)
      dispatch({ type: 'REMOVE_REVIEW', reviewId })
    } catch (err) {
      console.log('ReviewActions: err in removeReview', err)
    }
  }
}
