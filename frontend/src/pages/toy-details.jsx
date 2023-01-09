import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy-service'




export function ToysDetails() {
    // return <h1>hello from todo details</h1>

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        toyService.getById(toyId)
            .then(toy => {
                setToy(toy)
            })
            .catch(err => {
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }, [])





    if (!toy) return <h1 className='loading'>Loadings....</h1>
    return toy && <div className='flex-grow main-layout toy-details'>
        <h2>Toy Details </h2>
        <br />
        <h4>{toy.toyName}</h4>
        <p>Price: {toy.price}$</p>
        {!toy.inStock && <p className='out-stock'>Out of stock</p>}
        <div className='details-img'>

            <img src={require(`../assets/img/${toy.imgUrl}`)} />

        </div>
        <p>Desciption: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ducimus sit ipsa mollitia sed ipsum odit? Distinctio reiciendis quo cupiditate neque at, itaque ducimus quod voluptates dignissimos adipisci beatae deleniti?</p>
        <ul><span className='labels-headline'>Labels:</span>
            {toy.labels.map(label => <li className='labels-li' key={`${toy._id} + ${label}`}>{label}</li>)}
        </ul>
        <div className='btn-back'>
            <Link to="/toy" className="btn">Back to List</Link>
        </div>


    </div >
}