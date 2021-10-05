import { Component } from 'react'
import { connect } from 'react-redux'
import { AnimatePresence } from 'framer-motion';

import { toyService } from '../services/toy.service.js'

import { Loader } from './../cmps/Loader';
import { ChatApp } from './../cmps/ChatApp';
import { Modal } from './../cmps/Modal';
import { ToyReview } from '../cmps/ToyReview.jsx';
import { ReviewAdd } from './../cmps/ReviewAdd';

import chat from '../assets/img/chat.svg'
import toys from '../assets/img/toys-bg.png'
import { loadReviews, addReview, deleteReview } from '../store/actions/review.actions.js'

function Popup(props) {
    return (
        <section className="popup">

            <div className="header">
                <h3>Welcome to chat</h3>
            </div>

            <div className="main">
                {props.children}
            </div>

            <div className="footer">
                <p>press Esc key to exit</p>
            </div>

        </section>
    )
}

class _ToyDetails extends Component {
    state = {
        toy: {},
        isChatShown: false,
        isAddShown: false
    }

    componentDidMount() {
        this.loadToyAndReviews()
        window.addEventListener('keydown', this.exitChatFunc);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.exitChatFunc, false);
    }

    async loadToyAndReviews() {
        try {
            const toyId = this.props.match.params.toyId;
            const toy = await toyService.getById(toyId)
            if (!toy) {
                this.props.history.push('/')
                return;
            }
            const reviews = await this.props.loadReviews({ toyId }) || [];
            this.setState({ toy, reviews })
        } catch (err) {
            console.log(err)
        }
    }

    exitChatFunc = ({ key }) => {
        if (key === 'Escape') {
            this.setState({ isChatShown: false })
        }
    }

    onAddReview = async (review) => {
        try {
            await this.props.addReview(this.state.toy._id, review)
            this.setReviewsShow()
        } catch (err) {
            console.log('login first');
        }
    }

    onDeleteReview = async (reviewId) => {
        try {
            await this.props.deleteReview(reviewId)
        } catch (err) {
            console.log('admin or owner only');
        }
    }

    setChatShow = () => {
        this.setState({ isChatShown: !this.state.isChatShown })
    }

    setReviewsShow = () => {
        this.setState({ isAddShown: !this.state.isAddShown })
    }

    render() {
        const { toy, isChatShown, isAddShown } = this.state;
        const { reviews, user, loader } = this.props
        if (loader) return <Loader />
        const date = new Date(toy.createdAt).toLocaleString();
        return (
            <section className="toy-details">

                <div className="toy-info">
                    <h1>{toy.name}</h1>
                    <h3>Price: ${toy.price}</h3>
                    <h4>Created at: {date}</h4>
                    <div className="toys-bg">
                        <img src={toy.img || toys} alt="toys" />
                    </div>
                </div>

                <div className="toy-reviews-info">
                    <div className="toy-reviews">
                        <small>Reviews</small>
                        {reviews.length > 0 ?
                            reviews.map(review => <ToyReview key={review._id}
                                review={review}
                                onDeleteReview={this.onDeleteReview}
                                user={user} />)
                            :
                            <p>no reviews yet</p>}
                    </div>
                    {user?.username &&
                        !isAddShown && <button className="reviews-toggle" onClick={this.setReviewsShow}>Add review</button>
                    }
                </div>

                {
                    isAddShown &&
                    <AnimatePresence
                        initial={false}
                        exitBeforeEnter={true}
                        onExitComplete={() => null}>
                        <Modal handleClose={this.setReviewsShow}>
                            <ReviewAdd onAddReview={this.onAddReview} />
                        </Modal>
                    </AnimatePresence>

                }

                {/* <button><Link to={`/toy`}>Back</Link></button> */}
                <img className="chat-icon" onClick={this.setChatShow} src={chat} alt="chat" />

                {isChatShown && <Popup><ChatApp id={toy._id} /></Popup>}
            </section >
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        reviews: state.reviewModule.reviews,
        loader: state.systemModule.loader
    }
}

const mapDispatchToProps = {
    addReview,
    deleteReview,
    loadReviews
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)