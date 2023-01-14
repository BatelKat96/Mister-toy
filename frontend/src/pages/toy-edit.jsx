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
        async function data() {

            try {
                const toy = await toyService.getById(toyId)
                console.log('kdjk')
                setToy(toy)
            }
            catch (err) {
                showErrorMsg('Cannot load toy')
                console.log('no:')
                navigate('/toy')
            }
        }
        data()
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
    async function onSaveEdit(ev) {
        ev.preventDefault()
        try {
            const savedToy = await saveToy(toy)
            console.log('savedToy add after action:', savedToy)

            showSuccessMsg((!toyId) ? 'Toy added' : `Toy edited (id: ${savedToy._id})`)
            navigate('/toy')
        } catch (err) {
            showErrorMsg((!toyId) ? 'Cannot add toy' : 'Cannot change toy status', err)
            navigate('/toy')
        }
    }

    if (!toy) return <h1 className='loading'>Loadings....</h1>
    return <div className='flex-grow main-layout toy-edit'>
        {(!toyId) ? <h2>Add toy </h2> : <h2>Toy Edit </h2>}
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
                min="1"
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
