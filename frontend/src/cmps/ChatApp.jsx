import { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socket.service';
import { sendMsg } from '../store/actions/toy.actions.js'


class _ChatApp extends Component {
    state = {
        txt: '',
        userTyping: null
    }

    componentDidMount() {
        this.setState({ txt: '' });
        socketService.emit('chat topic', this.props.id)
        socketService.on('chat addMsg', this.addMsg)
        socketService.on('chat userTyping', this.setTyping)
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg)
        socketService.off('chat userTyping', this.setTyping)
        clearTimeout(this.timeout)
    }

    handleChange = (ev) => {
        const value = ev.target.value;

        const user = this.props.user?.fullname || 'Guest'
        socketService.emit('chat userTyping', { user })
        if(ev && !value) socketService.emit('chat userTyping', '')
        
        this.setState({ txt: value });
    };

    addMsg = newMsg => {
        const txt = newMsg.from + ': ' + newMsg.txt
        this.props.sendMsg({ id: this.props.id, msg: txt })
    }

    setTyping = ({ user }) => {
        const userTyping = user ? `${user} is typing..` : ''
        this.setState({ userTyping }, () =>{
            setTimeout(() => {
                this.setState({ userTyping: '' })
            }, 3000);
        })
    }

    onSend = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.txt) return;
        const from = this.props.user?.fullname || 'Guest'
        socketService.emit('chat newMsg', { from, txt: this.state.txt })
        socketService.emit('chat userTyping', '')
        // RESET TXT
        this.setState({ txt: '' });
    }


    render() {
        const { chatMap, id } = this.props;
        const { txt, userTyping } = this.state;
        return (
            <section className="chat-app">
                {chatMap[id]?.msgs?.length > 0 && chatMap[id].msgs.map((txt, idx) => {
                    return <p key={idx}>{txt}</p>
                })}
                <form className="chat-app-form" onSubmit={this.onSend}>
                    <input placeholder="Ask something" type="text" value={txt} onChange={this.handleChange} autoFocus autoComplete='off' required />
                    <button>Send!</button>
                </form>
                <small>{userTyping ? userTyping : ''}</small>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        chatMap: state.toyModule.chatMap,
    }
}

const mapDispatchToProps = {
    sendMsg
}

export const ChatApp = connect(mapStateToProps, mapDispatchToProps)(_ChatApp)