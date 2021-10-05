import hero from '../assets/img/hero1.jpg'
import toys from '../assets/img/toys.png'
import stats from '../assets/img/stats.png'
import about from '../assets/img/about.png'
import { ImgLink } from '../cmps/ImgLink'

export function Home() {
    return (
        <section className="home">
            <img className="home-hero" src={hero} alt="toys-hero" />
            <div className="img-links">
                <ImgLink link={'/toy'} imgSrc={toys}>Our Products</ImgLink>
                <ImgLink link={'/dashboard'} imgSrc={stats}>Statistics</ImgLink>
                <ImgLink link={'/about'} imgSrc={about}>About us</ImgLink>
                
            </div>
        </section >
    )
}
