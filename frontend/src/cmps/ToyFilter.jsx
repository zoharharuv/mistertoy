import { Component } from 'react';
import Select from 'react-select';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import GoogleSelect from '@material-ui/core/Select';

const options = [
    { value: 'On wheels', label: 'On wheels' },
    { value: 'Box game', label: 'Box game' },
    { value: 'Art', label: 'Art' },
    { value: 'Baby', label: 'Baby' },
    { value: 'Doll', label: 'Doll' },
    { value: 'Puzzle', label: 'Puzzle' },
    { value: 'Outdoor', label: 'Outdoor' },
];

export class ToyFilter extends Component {
    state = {
        filter: {
            name: '',
            status: '',
            inStock: false,
            labels: []
        },
        selectedOption: null
    }

    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption }, () => {
            const labels = selectedOption.map(label => {
                return label.value;
            }) || [];
            this.setState({ filter: { ...this.state.filter, labels } }, () => {
                this.props.filterToys(this.state.filter);
            });
        });
    };

    handleChange = (ev, val) => {
        const field = ev.target.name;
        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        this.setState({ filter: { ...this.state.filter, [field]: value }, }, () => {
            this.props.filterToys(this.state.filter);
        });
    };



    render() {
        const { selectedOption } = this.state;
        const { name, status, inStock } = this.state.filter;
        return (
            <section className="toy-filter" >
                <div className="filter-search">
                    <span className="fas fa-search" style={{ position: 'absolute', right: 5, top: 30, width: 20, height: 20 }} />
                    <TextField
                        name="name"
                        id="name"
                        type="search"
                        value={name}
                        onChange={this.handleChange}
                        autoComplete="off"
                        variant="outlined"
                        margin="normal"
                        label="Search"
                    />
                </div>
                <GoogleSelect
                    native
                    value={status}
                    onChange={this.handleChange}
                    // label={status || 'all'}
                    name="status"
                    id="status"
                >
                    <option value={''}>All</option>
                    <option value={'name'}>Name</option>
                    <option value={'price'}>Price</option>
                    <option value={'created'}>Created</option>
                </GoogleSelect>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={inStock}
                            onChange={this.handleChange}
                            name="inStock"
                            color="primary"
                        />
                    }
                    label="In stock"
                />


                <Select
                    className="label-select"
                    placeholder="Select labels"
                    closeMenuOnSelect={false}
                    isMulti
                    value={selectedOption}
                    onChange={this.handleChangeSelect}
                    options={options}
                />
            </section>
        )
    }

}