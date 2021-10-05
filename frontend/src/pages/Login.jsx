import { Component } from 'react'
import { connect } from 'react-redux'
import { onLogin, onSignup } from '../store/actions/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'


import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';

class _Login extends Component {
    state = {
        isSignup: false
    }
    componentDidMount() {
        if (this.props.user) this.props.history.push('/')
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required username';
        }
        if (!values.password) {
            errors.password = 'Required password';
        }
        if (this.state.isSignup && !values.fullname) {
            errors.fullname = 'Required fullname';
        }
        return errors;
    }

    onFormSubmit = async (values, { setSubmitting }) => {
        try {
            const res = (this.state.isSignup) ?
                await this.props.onSignup(values) :
                await this.props.onLogin(values)
            if (!res) {
                (this.state.isSignup) ? showErrorMsg('User already exists') : showErrorMsg('Wrong credentials')
            } else {
                this.props.history.push('/')
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }



    render() {
        const { isSignup } = this.state;
        const initialValues = { fullname: '', username: '', password: '' }
        const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'primary'} />

        return (
            <section className="login-page">
                <div className="login-section">
                    <h1>Enter your credentials</h1>
                    <Formik
                        initialValues={initialValues}
                        validate={this.validate}
                        onSubmit={this.onFormSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {isSignup && <><Field type="text" name="fullname" label="fullname" as={TextFieldOutlined} />
                                    <ErrorMessage name="fullname" component="div" /></>}
                                <Field type="text" name="username" label="username" as={TextFieldOutlined} />
                                <ErrorMessage name="username" component="div" />
                                <Field type="password" name="password" label="password" as={TextFieldOutlined} />
                                <ErrorMessage name="password" component="div" />
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    type="submit"
                                    disabled={isSubmitting}>
                                    {!isSignup ? 'Login' : 'Signup'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <p className="btn-link">
                    {!isSignup ?
                        <>You dont have a user yet? <span onClick={this.toggleSignup}>Click here to Signup</span></>
                        :
                        <span onClick={this.toggleSignup}>Back to login</span>
                    }
                </p>
            </section >

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
}



export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)