import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadReviews } from '../store/actions/review.actions.js'
import { Loader } from './../cmps/Loader';

class _UserDetails extends Component {

    componentDidMount() {
        this.loadReviews()
    }

    loadReviews = async () => {
        const userId = this.props.match.params.id;
        try {
            await this.props.loadReviews({ userId });
        } catch (err) {
            console.log(err)
            this.props.history.push('/')
        }
    }

    render() {
        const { reviews, loader } = this.props;
        if (loader) return <Loader />
        return (
            <section className="user-details">
                {reviews.length > 0 ?
                    <>
                        <h1>{reviews[0].user.fullname}'s reviews</h1>
                        <div className="general-reviews">
                            {reviews.map(review =>
                                <div key={review._id} className="general-review">
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
                    </>
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


export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)