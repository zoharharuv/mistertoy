import { Link } from "react-router-dom"
export function ImgLink(props) {
    return (
        <Link to={props.link} className="img-link">
            <div className="img-link-content" style={{
                backgroundImage: `url(${props.imgSrc})`
            }}>
                <div className="img-link-bg">
                {props.children}
                </div>
                <div className="img-link-div">
                    <span className="img-link-visit">Visit</span>
                    <button className="img-link-btn">
                        <span className="fas fa-angle-double-right" />
                    </button>
                </div>
            </div>
        </Link>
    )
}