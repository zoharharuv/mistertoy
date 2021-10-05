import { Link } from 'react-router-dom'
export function ToyPreview({ user, toy, onRemoveToy, addToCart }) {
    const num = Math.floor(Math.random() * 10 + 1);
    return (
        <li className={`toy-preview ${!toy.inStock && `sold-out`}`}>
            <h4>{toy.name}</h4>
            <h1 className="toy-preview-img">
                {
                    toy.img ?
                        <img src={toy.img} alt="toy icon" />
                        :
                        {
                            1: '🐵',
                            2: '🐶',
                            3: '🐺',
                            4: '🦁',
                            5: '🦝',
                            6: '🦊',
                            7: '🐮',
                            8: '🐷',
                            9: '🐴',
                            10: '🐸',
                        }[num]

                }
            </h1>
            <p>Price: <span className="toy-price">${toy.price.toLocaleString()}</span></p>
            <small className="toy-preview-labels">&#8205;{toy.labels.map(label => label).join(' | ')}</small>
            <p>&#8205;{!toy.inStock && 'Sold out!'}</p>
            <div className="preview-actions">
                {user && user.isAdmin && <> <span onClick={() => {
                    onRemoveToy(toy._id)
                }} className="fas fa-trash" ></span>
                    <Link to={`/toy/edit/${toy._id}`}><span className="fas fa-edit" /></Link></>}
                <Link to={`/toy/details/${toy._id}`}> <span className="fas fa-info-circle" /></Link>
                {toy.inStock && <span className="fas fa-shopping-cart buy" onClick={() => {
                    addToCart(toy)
                }}></span>}
            </div>

        </li>
    )
}