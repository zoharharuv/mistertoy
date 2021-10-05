import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { loadReviews } from './../store/actions/review.actions';
import { Loader } from './../cmps/Loader';

class _ReviewsPage extends Component {
    componentDidMount() {
        this.loadReviews()
    }

    loadReviews = async () => {
        try {
            await this.props.loadReviews();
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { reviews, loader } = this.props;
        if (loader) return <Loader />
        return (
            <section className="reviews-page">
                <h1>All reviews</h1>
                {reviews.length > 0 ?
                        <div className="general-reviews">
                            {reviews.map(review =>
                                <div key={review._id} className="general-review">
                                    <h3>From: <Link to={`/user/${review.user._id}`}>
                                        {review.user.fullname}
                                    </Link>
                                    </h3>
                                    <h3>Toy: <Link to={`/toy/details/${review.toy._id}`}>
                                        {review.toy.name}
                                    </Link>
                                    </h3>
                                    <h4>{'⭐'.repeat(review.rating)}</h4>
                                    <p>{review.content}</p>
                                    <small className="review-date">{review.createdAt ? new Date(review.createdAt).toLocaleString() : ''}</small>
                                </div>
                            )}
                        </div>
                    :
                    <p>no reviews yet</p>}
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        reviews: state.reviewModule.reviews,
        loader: state.systemModule.loader
    }
}

const mapDispatchToProps = {
    loadReviews
}


export const ReviewsPage = connect(mapStateToProps, mapDispatchToProps)(_ReviewsPage)

