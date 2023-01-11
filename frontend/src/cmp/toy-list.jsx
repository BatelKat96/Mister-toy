import { Link } from 'react-router-dom'
import { ToyPreview } from './toy-preview'


export function ToyList({ toys, onRemoveToy }) {
    // console.log('toys:', toys)
    return <ul className="toys-list clean-list">
        {toys.map(toy =>
            <li className="review" key={toy._id}>
                <ToyPreview toy={toy} />

                <div className='btn-option-section'>
                    <button className="clean-btn fa-solid x btn"
                        onClick={() => { onRemoveToy(toy._id) }}></button>
                    <Link to={`/toy/edit/${toy._id}`}>
                        <button className="clean-btn btn">Edit</button>
                    </Link>
                    <Link to={`/toy/${toy._id}`}>
                        <button className="clean-btn btn" >Details</button>
                    </Link>
                </div>
            </li>)}
    </ul>


}