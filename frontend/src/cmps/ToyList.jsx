import { ToyPreview } from "./ToyPreview"

export function ToyList({ user, toys, onRemoveToy, addToCart }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <ToyPreview key={toy._id} user={user} toy={toy} onRemoveToy={onRemoveToy} addToCart={addToCart} />
            )}
        </ul>
    )
}