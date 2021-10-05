import { Component } from 'react'
import { connect } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { onEditToy } from '../store/actions/toy.actions.js'
import { Link } from 'react-router-dom'
import { TextField, Button, FormControl } from '@material-ui/core';

class _ToyEdit extends Component {
    state = {
        toy: {
            name: '',
            price: 0,
            labels: [],
            createdAt: 0,
            inStock: false
        }
    }
    componentDidMount() {
        this.loadToy()
    }

    async loadToy() {
        const toyId = this.props.match.params.toyId;
        try {
            const toyToCopy = await toyService.getById(toyId)
            const copy = JSON.stringify(toyToCopy)
            const toy = JSON.parse(copy);
            this.setState({ toy })
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = field === 'price' ? +ev.target.value : ev.target.value;
        this.setState({ toy: { ...this.state.toy, [field]: value } });
    };

    onEditTodo = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.toy.name || !this.state.toy.price) return;
        const toy = { ...this.state.toy }
        this.props.onEditToy(toy);
        this.props.history.push('/toy');
    }

    render() {
        const { name, price } = this.state.toy;
        if (!Object.keys(this.state.toy)) return <h1>Loading..</h1>
        return (
            <section className="toy-edit">
                <FormControl className="edit-toy-form" onSubmit={this.onEditTodo}>
                <h1>Edit toy details</h1>
                    <TextField
                        id="toy-name"
                        placeholder="Name"
                        value={name}
                        name="name"
                        variant="outlined"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />

                    <TextField
                        type="number"
                        id="toy-price"
                        placeholder="Price"
                        value={price}
                        name="price"
                        variant="outlined"
                        onChange={this.handleChange}
                        autoComplete="off"
                        required
                    />
                    <Button color="primary" variant="contained" onClick={this.onEditTodo}>Update!</Button>
                    <Link to={`/toy`}><Button color="secondary" variant="contained" size="small">Back</Button></Link>
                </FormControl>

            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys
    }
}

const mapDispatchToProps = {
    onEditToy
}


export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)