import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy-service'
import { saveToy } from '../store/actions/toy.action'

export function ToyEdit() {

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

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToy((prevTodo) => ({ ...prevTodo, [field]: value }))

    }

    function handleBoolenChange({ target }) {
        let { value, type, name: field } = target
        let newValue
        if (value === 'false') newValue = false
        if (value === 'true') newValue = true
        setToy((prevTodo) => ({ ...prevTodo, [field]: newValue }))

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

    if (!toy) return <h1 className='loading'>loadings....</h1>
    return toy && <div className='flex-grow main-layout toy-edit'>
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

            <label htmlFor="inStock">Is in stock:</label>
            <select name="inStock" id="inStock"
                onChange={handleBoolenChange} defaultValue={toy.inStock ? 'true' : 'false'}>
                <option value="false">False</option>
                <option value="true">True</option>
            </select>
            <button className='btn clean-btn'>Save</button>
            <Link to="/toy" className="btn">Back to List</Link>

        </form >

    </div >
}
