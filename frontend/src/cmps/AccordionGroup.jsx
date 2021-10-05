import React from 'react'
export class AccordionGroup extends React.Component {
    state = {
        panel: 0
    }

    toggleAccordion = (val) => {
        const panel = val === this.state.panel ? 0 : val;
        this.setState({ panel });
    }

    render() {
        const { panel } = this.state
        return (
            <div className="accordion-group">
                <div className="accordion-header">
                    <h3>{this.props.title}</h3>
                </div>
                {this.props.children.map((Child, idx) => {
                    // return <Child.type key={idx} title={Child.props.title} toggleAccordion={()=>this.toggleAccordion(Child.props.value)} panel={panel} />
                    // toggleAccordion={this.toggleAccordion} panel={panel}
                    // { console.log('Child', child) }
                    return <React.Fragment key={idx}>{React.cloneElement(Child, { toggleAccordion: this.toggleAccordion, panel: panel })}</React.Fragment>
                })}
            </div>
        )
    }
}
