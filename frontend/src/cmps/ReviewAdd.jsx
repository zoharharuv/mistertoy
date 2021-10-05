import { Component, createRef } from 'react'
import { Select } from '@material-ui/core';
export class ReviewAdd extends Component {
    state = {
        review: {
                        content: '',
            rating: 1
        }
    }

    inputRef = createRef()

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ review: { ...this.state.review, [field]: value } });
    };

    onAdd = (ev) => {
        if (!this.state.review.content && !this.state.review.rating) return;
        ev.preventDefault();
        this.setState({ review: { ...this.state.review } }, () => {
            this.props.onAddReview(this.state.review)
            this.cleanInputs();
        })
    };

    cleanInputs = () => {
        const newReview = {
            content: '',
            rating: 1
        }
        this.setState({ review: newReview }, this.inputRef.current.focus());
    }

    render() {

        const { rating, content } = this.state.review;
        return (
            <form className='review-add' onSubmit={this.onAdd}>
                <label htmlFor="content">Your review:</label>
                <textarea
                    ref={this.inputRef}
                    name='content'
                    id='content'
                    placeholder='Write something'
                    value={content}
                    onChange={this.handleChange}
                    rows="6"
                    minLength="1"
                    maxLength="420"
                    cols="30"
                    wrap="soft"
                    required>
                </textarea>

                <Select
                    className="review-add-select"
                    native
                    name='rating'
                    id='rating'
                    type='number'
                    placeholder='Rating'
                    value={rating}
                    onChange={this.handleChange}
                >
                    <option value={1}>⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                </Select>

                {/* <label htmlFor='rating'>Rating</label>
                <select
                    name='rating'
                    id='rating'
                    type='number'
                    placeholder='Rating'
                    value={rating}
                    onChange={this.handleChange}>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select> */}
                <button className="add-review-btn">Add review</button>
            </form>
        );
    }
}
