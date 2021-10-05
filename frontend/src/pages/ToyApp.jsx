import { Component } from 'react'
import { connect } from 'react-redux'

import { loadToys, onAddToy, onEditToy, onRemoveToy, addToCart, filterToys } from '../store/actions/toy.actions.js'
import { setLoader } from '../store/actions/system.actions';

import { showSuccessMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from './../cmps/ToyFilter.jsx';
import { AddToy } from '../cmps/AddToy.jsx'
import { AnimatePresence } from 'framer-motion';
import { Modal } from './../cmps/Modal';
import { Loader } from './../cmps/Loader';

class _ToyApp extends Component {
    state = {
        isAddShown: false
    }
    componentDidMount() {
        this.asyncLoader()
    }

    asyncLoader = async (filter = null) => {
        this.props.setLoader()
        !filter ? await this.props.loadToys() : await this.props.filterToys(filter);
        this.props.setLoader()
    }

    onRemoveToy = (toyId) => {
        this.props.onRemoveToy(toyId)
    }

    onAddToy = async (toy) => {
        if (!toy.price || !toy.name) return;
        await this.props.onAddToy(toy)
        this.onToggleAdd()
    }

    addToCart = (toy) => {
        this.props.addToCart(toy)
        showSuccessMsg('Added to Cart')
    }

    filterToys = (filter) => {
        this.asyncLoader(filter)
    }

    onToggleAdd = () => {
        this.setState({ isAddShown: !this.state.isAddShown })
    }

    render() {
        const { toys, user, loader } = this.props
        const { isAddShown } = this.state

        return (
            <section className="toy-app">

                <ToyFilter filterToys={this.filterToys} />
                {loader && <Loader />}
                {!loader && toys.length > 0 && <ToyList user={user} toys={toys} onRemoveToy={this.onRemoveToy} addToCart={this.addToCart} />}
                {user && user.isAdmin && <button className="add-toy-btn" onClick={this.onToggleAdd}><span className="fas fa-plus"></span></button>}

                {/* MODAL */}
                {isAddShown &&
                    <AnimatePresence
                        initial={false}
                        exitBeforeEnter={true}
                        onExitComplete={() => null}>
                        <Modal handleClose={this.onToggleAdd}>
                            <AddToy onAddToy={this.onAddToy} onToggleAdd={this.onToggleAdd} />
                        </Modal>
                    </AnimatePresence>
                }

            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user,
        loader: state.systemModule.loader
    }
}
const mapDispatchToProps = {
    loadToys,
    onRemoveToy,
    onAddToy,
    onEditToy,
    addToCart,
    filterToys,
    setLoader
}


export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)