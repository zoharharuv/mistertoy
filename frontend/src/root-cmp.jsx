import { Component } from 'react'
import { Switch, Route } from 'react-router'

import routes from './routes.js'
import { socketService } from './services/socket.service';

import { Header } from './cmps/Header.jsx'
import { Footer } from './cmps/Footer.jsx'
export class RootCmp extends Component {

    componentWillUnmount() {
        socketService.terminate()
    }

    render() {
        return (
            <div>
                <Header />
                <main className="main-layout">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
                <Footer />
            </div>
        )
    }
}

