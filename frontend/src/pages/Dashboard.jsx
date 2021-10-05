import { Pie } from 'react-chartjs-2';
import { Component } from 'react';
import { toyService } from './../services/toy.service';

export class Dashboard extends Component {
    state = {
        toysData: [],
        toysLabels: []
    }
    componentDidMount() {
        this.loadLables()
    }

    async loadLables() {
        try {
            const toys = await toyService.query()
            const labels = toys.map(toy => toy.labels).flat();
            const toysMap = labels.reduce((acc, label) => {
                acc[label] = acc[label] ? acc[label] + 1 : 1;
                return acc;
            }, {});

            const toysLabels = Object.keys(toysMap);
            const toysData = Object.values(toysMap);


            this.setState({ toysData, toysLabels })
        } catch (err) {
            console.log(err);
        }
    }
    
    render() {
        const { toysData, toysLabels } = this.state;
        const data = {
            labels: [...toysLabels],
            datasets: [
                {
                    label: '# of Votes',
                    data: [...toysData],
                    backgroundColor: [
                        'rgba(3, 29, 243, 0.6)',
                        'rgba(77, 3, 155, 0.6)',
                        'rgba(5, 16, 216, 0.6)',
                        'rgba(108, 46, 173, 0.6)',
                        'rgba(6, 162, 55, 0.6)',
                        'rgba(22, 48, 82, 0.6)',
                        'rgba(55, 48, 82, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255,255,255, 1)'
                    ],
                    borderWidth: 2,
                },
            ],
        };

        return (
            <section className="dashboard flex column align-center">
                <h1 className="dashboard-header">Out products supply</h1>
                <Pie data={data} />
            </section>
        )
    };
}

