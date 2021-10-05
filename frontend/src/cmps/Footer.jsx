import { Component } from 'react'
import { connect } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
} from "react-share";

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { Modal } from './Modal.jsx'


class _Footer extends Component {

    state = {
        isCartShown: false
    }

    hideModal = () => {
        this.setState({ isCartShown: false })
    }
    showModal = () => {
        if (!this.props.cart.length) {
            showErrorMsg('Add something to cart first')
            return;
        }
        this.setState({ isCartShown: true })
    }

    removeFromCart = (idx) => {
        if (this.props.cart.length < 2) this.hideModal()
        this.props.dispatch({
            type: 'REMOVE_FROM_CART',
            idx
        })
    }
    checkout = () => {
        showSuccessMsg('Charged you: $' + this.cartTotal)
        this.props.dispatch({
            type: 'CLEAR_CART',
        })
        setTimeout(() => {
            this.hideModal()
        }, 800);
    }
    get cartTotal() {
        return this.props.cart.reduce((acc, toy) => acc + toy.price, 0).toLocaleString()
    }

    render() {
        const { isCartShown } = this.state
        const { cart } = this.props;
        const shareUrl = 'https://zoharharuv.github.io/appsus/#/'
        return (
            <footer>
                <section className="footer-content main-layout flex justify-center align-center">
                    <div className="share-btns">
                        <FacebookShareButton url={shareUrl} >
                            <FacebookIcon size={25} borderRadius={20} />
                        </FacebookShareButton >
                        <WhatsappShareButton url={shareUrl} >
                            <WhatsappIcon size={25} borderRadius={20} />
                        </WhatsappShareButton >
                        <LinkedinShareButton url={shareUrl} >
                            <LinkedinIcon size={25} borderRadius={20} />
                        </LinkedinShareButton >
                    </div>
                    <p>
                        coffeerights 2021
                    </p>
                    <div className="cart-info">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={(isCartShown) ? 'hide-btn' : 'show-btn'} onClick={(ev) => {
                                ev.preventDefault();
                                this.showModal()
                            }}>
                            <span>{cart.length} </span><span className="fas fa-shopping-cart"></span>
                        </motion.button>
                    </div>
                    <AnimatePresence
                        initial={false}
                        exitBeforeEnter={true}
                        onExitComplete={() => null}>
                        {isCartShown && cart.length > 0 &&
                            <Modal handleClose={this.hideModal}>
                                <div className="cart">
                                    <h1>Your Cart</h1>
                                    <aside className="cart-items">
                                        {
                                            cart.map((toy, idx) => <div className="cart-item" key={idx}>
                                                {toy.name}
                                                <span onClick={() => {
                                                    this.removeFromCart(idx)
                                                }} className="fas fa-times cart-item-remove" />
                                            </div>)
                                        }
                                    </aside>
                                    <p>Total: <span>${this.cartTotal}</span> </p>
                                    <button className="cart-checkout" onClick={this.checkout}>Checkout</button>
                                </div>
                            </Modal>
                        }
                    </AnimatePresence>
                </section>
            </footer>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.toyModule.cart
    }
}

export const Footer = connect(mapStateToProps)(_Footer)