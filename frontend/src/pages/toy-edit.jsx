import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy-service'
import { saveToy } from '../store/actions/toy.action'

export function ToyEdit() {

    const [toy, setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }, [])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToy((prevToy) => ({ ...prevToy, [field]: value }))

    }

    function handleBoolenChange({ target }) {
        let { value, type, name: field } = target
        let newValue
        if (value === 'false') newValue = false
        if (value === 'true') newValue = true
        setToy((prevToy) => ({ ...prevToy, [field]: newValue }))

    }
    function onSaveEdit(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then(() => {
                showSuccessMsg(`Toy edited (id: ${toy._id})`)
                navigate('/toy')
            })
            .catch((err) => {
                showErrorMsg('Cannot change toy status', err)
            })
    }

    if (!toy) return <h1 className='loading'>Loadings....</h1>
    return <div className='flex-grow main-layout toy-edit'>
        <h2>Toy Edit 🐛</h2>
        <br />
        <form onSubmit={onSaveEdit}>

            <label htmlFor="toyName">Toy Name:</label>
            <input type="text"
                name="toyName"
                id="toyName"
                onChange={handleChange}
                defaultValue={toy.toyName}
            />

            <br />

            <label htmlFor="price">Price:</label>
            <input type="number"
                name="price"
                id="price"
                onChange={handleChange}
                defaultValue={toy.price}
            />
            <br />

            <label htmlFor="inStock">Is in stock:</label>
            <select name="inStock" id="inStock"
                onChange={handleBoolenChange} defaultValue={toy.inStock ? 'true' : 'false'}>
                <option value="false">No</option>
                <option value="true">Yes</option>
            </select>
            <br />

            <button className='btn clean-btn'>Save</button>
            <Link to="/toy" className="btn">Back to List</Link>

        </form >

    </div >
}
