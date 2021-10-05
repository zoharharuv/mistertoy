import { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { socketService } from './../services/socket.service';
import { onLogout, getCurrentUser } from '../store/actions/user.actions.js'
import { UserMsg } from './UserMsg.jsx'
import { showSuccessMsg } from '../services/event-bus.service';
import toy from '../assets/img/toy.svg'

class _Header extends Component {
    state = {
        isNavOpen: false
    }

    componentDidMount() {
        this.props.getCurrentUser()
        socketService.on('admin update', this.showUpdate)
    }

    componentWillUnmount() {
        socketService.off('admin update', this.showUpdate)
    }

    showUpdate = (data) => {
        console.log(data);
        showSuccessMsg(data)
    }

    onLogout = () => {
        this.props.onLogout()
    }

    clickNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }

    render() {
        const { user } = this.props
        const { isNavOpen } = this.state
        return (
            <header>
                <div className={`screen ${isNavOpen ? 'active' : ''}`} onClick={this.clickNav}></div>
                <section className="header-content main-layout">
                    <NavLink to="/">
                        <img className="logo" src={toy} alt="toy" />
                    </NavLink>
                    <nav onClick={this.clickNav} className={isNavOpen ? 'active' : ''}>
                        <NavLink to="/toy">Toys</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/dashboard">Statistics</NavLink>
                        <NavLink to="/reviews">Reviews</NavLink>

                        <div className="user-info">
                            {user && Object.keys(user).length > 0 ?
                                <>
                                    <p>
                                        <NavLink to={`/user/${user._id}`}>{user.fullname}</NavLink>
                                    </p>
                                    <button className="logout-btn" onClick={this.onLogout}>Logout <span className="fas fa-sign-out-alt"></span></button>
                                </>
                                :
                                <NavLink className="login-btn" to="/login">Login <span className="fas fa-sign-in-alt"></span></NavLink>
                            }
                        </div>
                    </nav>
                    <button className="btn-menu-toggle" onClick={this.clickNav}>☰</button>
                </section>
                <UserMsg />
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogout,
    getCurrentUser
}



export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)