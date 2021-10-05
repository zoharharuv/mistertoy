import { Link } from 'react-router-dom'

export function ToyReview({ review, onDeleteReview, user }) {
    const date = review.createdAt ? new Date(review.createdAt).toLocaleString() : '';
    var canDelete = false;
    if (user) canDelete = user.isAdmin || user._id === review.userId
    return (
        <div className="toy-review">
            <h3><Link to={`/user/${review.user._id}`}>
                {review.user.fullname}
            </Link>
            </h3>
            <h3>{'⭐'.repeat(review.rating)}</h3>
            <p>{review.content}</p>
            <small className="review-date">{date}</small>
            {canDelete && <button className="delete-review-btn" onClick={() => {
                onDeleteReview(review._id)
            }}><span className="fas fa-times" /></button>}
        </div>
    )
}