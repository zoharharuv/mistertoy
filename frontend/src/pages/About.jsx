import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from '@material-ui/core/Button';
import { AccordionGroup } from './../cmps/AccordionGroup';
import { AccordionItem } from './../cmps/AccordionItem';
import { Loader } from './../cmps/Loader';

class _About extends Component {

    state = {
        center: {
            lat: 31.194,
            lng: 34.339
        },
        isInfoWindowOn: false,
        name: '',
        loaded: false
    }

    onMapClicked = (props, map, ev) => {
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onCityClicked = (lat, lng) => {
        this.setState({ center: { lat, lng } })
    }

    onMarkerClicked = ({ name }) => {
        this.setState({ isInfoWindowOn: true, name })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }

    render() {
        const { center, isInfoWindowOn, name, loaded } = this.state
        const style = {
            width: "450px",
            height: "450px",
            position: "relative"
        };

        return (
            <section className="about">
                {!loaded && <Loader />}
                <AccordionGroup title="About us">
                    <AccordionItem title="Our Vision" value={1}>
                        <p>Its slogan — “Always High Prices, Always Scam” — reflect the company’s aim of putting its customers first by providing a diverse range of toys for fun and learning, offering great value for money to all.</p>
                    </AccordionItem >
                    <AccordionItem title="How it started" value={2}>
                        <p>Founded and established in September 2021, Mister Toy is the first Israelian home-grown toy store chain. Every outlet offers a wide selection of products in nine categories —  Vehicles and Remote Control; Pretend Play and Costumes; Craft and Activities; Sports and Outdoor Play; Action and Adventure; Building Sets and Blocks; Learning, Fun and Games; Party Supplies; and Infant and Dolls.</p>
                    </AccordionItem>
                </AccordionGroup>
                <Map
                    onReady={() => this.setState({ loaded: true })}
                    google={this.props.google}
                    zoom={12}
                    initialCenter={center}
                    onClick={this.onMapClicked}
                    center={center}
                    containerStyle={style}
                    className={`google-map ${loaded ? 'loaded' : 'loading'}`}
                >

                    <Marker
                        position={center}
                        name={'Current location'}
                        onClick={this.onMarkerClicked}
                    />
                    <Marker
                        position={{ lat: 31.251, lng: 34.791 }}
                        name={'Beer Sheva'}
                        onClick={this.onMarkerClicked}
                    />
                    <Marker
                        position={{ lat: 32.794, lng: 34.989 }}
                        name={'Haifa'}
                        onClick={this.onMarkerClicked}
                    />
                    <Marker
                        position={{ lat: 32.434, lng: 34.919 }}
                        name={'Hadera'}
                        onClick={this.onMarkerClicked}
                    />

                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={center}
                        visible={isInfoWindowOn}
                    >
                        <div>
                            <h1>{name}</h1>
                        </div>
                    </InfoWindow>
                </Map>

                <div className="branch-section">
                    <h3>Our branches</h3>
                    <nav className="branch-btns">
                        <Button variant="contained" color="secondary" onClick={() => { this.onCityClicked(31.251, 34.791) }} >Beer Sheva</Button>
                        <Button variant="contained" color="secondary" onClick={() => { this.onCityClicked(32.794, 34.989) }}>Haifa</Button>
                        <Button variant="contained" color="secondary" onClick={() => { this.onCityClicked(32.434, 34.919) }}>Hadera</Button>
                    </nav>
                </div>

            </section>
        );
    }
}

const LoadingContainer = () => (
    <Loader />
)

export const About = GoogleApiWrapper({
    apiKey: ('YOUR_API_KEY'),
    LoadingContainer: LoadingContainer
})(_About)