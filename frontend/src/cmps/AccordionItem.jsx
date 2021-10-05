import { Component } from 'react'
import PropTypes from 'prop-types'
export class AccordionItem extends Component {
    render() {
        const classNameVar = this.props.panel === this.props.value ? 'active' : ''
        return (
            <article className="accordion-item">
                <MyErrorBoundary>
                    <button onClick={() => {
                        this.props.toggleAccordion(this.props.value)
                    }
                    } className={`accordion ${classNameVar}`}>
                        {this.props.title}
                    </button>
                    <aside className={`panel ${classNameVar}`}>{this.props.children}</aside>
                </MyErrorBoundary>
            </article>
        )
    }
}

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired
}

class MyErrorBoundary extends Component {
    state = { error: null, errorInfo: null };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>

                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
