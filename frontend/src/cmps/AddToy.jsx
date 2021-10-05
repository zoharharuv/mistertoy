import { Component } from 'react';
import Select from 'react-select';
import { uploadImg } from '../services/cloudinary.service';

export class AddToy extends Component {
    state = {
        toy: {
            name: '',
            price: '',
            labels: [],
            img: ''
        },
        options: [],
        isUploading: false
    }

    componentDidMount() {
        this.loadLabels()
    }

    loadLabels() {
        const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
        const options = labels.map(label => {
            return { value: label.toLowerCase(), label }
        })
        this.setState((prevState) => ({ ...prevState, options }))
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = field === 'price' ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [field]: value } }))
    }

    handleImgChange = async (ev) => {
        const field = ev.target.name;
        this.setState((prevState) => ({ ...prevState, isUploading: true }))
        try {
            const value = await uploadImg(ev)
            this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [field]: value } }))
        } catch (err) {
            console.log(err);
        } finally {
            this.setState((prevState) => ({ ...prevState, isUploading: false }))
        }
    }

    handleSelectChange = (ev) => {
        const value = ev;
        if (value.length > 3) return;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, labels: value } }))
    }

    render() {
        const { toy, options, isUploading } = this.state
        const { onAddToy } = this.props
        return (
            <form className="add-toy">
                <label htmlFor="name">
                    <input type="text" name="name"
                        placeholder="Enter toy name " id="name"
                        value={toy.name} onChange={this.handleChange} autoComplete="off" />
                </label>

                <label htmlFor="price">
                    <input type="number" name="price"
                        placeholder="Enter toy price" id="price"
                        value={toy.price} onChange={this.handleChange} />
                </label>

                <label htmlFor="img">
                    {!isUploading && <p>{toy.img ? 'Uploaded' : 'Upload toy image'}</p>}
                    {isUploading && <p>Wait a bit..</p>}
                </label>
                <input className="hidden" type="file" name="img"
                    placeholder="Enter toy img" id="img"
                    defaultValue={toy.img} onChange={this.handleImgChange} />

                <Select
                    closeMenuOnSelect={false}
                    className="select"
                    value={toy.labels}
                    isMulti
                    onChange={this.handleSelectChange}
                    options={options}
                    placeholder="Choose up to 3 labels" />

                <button className="btn-add" onClick={(event) => {
                    event.preventDefault();
                    onAddToy(toy)
                }}>
                    <span className="fas fa-plus"></span>
                </button>

            </form>
        )
    }
}