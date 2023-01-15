import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToyMsgs } from '../cmp/toy-msg'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy-service'
import { utilService } from '../services/util.service'


export function ToysDetails() {

    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState(toyService.getEmptyMsg())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])


    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)

        } catch (err) {
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }


    function handleChange({ target }) {
        let { value, name: field } = target
        setMsg((prevMsg) => ({ ...prevMsg, [field]: value }))
    }

    async function onAddToyMsg(ev) {
        ev.preventDefault()
        try {
            console.log('msg de:', msg)

            const savedMsg = await toyService.addMsgToToy(toyId, msg)
            console.log('savedMsg de:', savedMsg)

            setToy((prevToy) => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))
            setMsg(toyService.getEmptyMsg())
            showSuccessMsg('Msg saved!')

        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save Msg')
        }
    }


    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeToyMsg(toyId, msgId)
            loadToy()
            showSuccessMsg('Msg Removed!')

        } catch (error) {
            showErrorMsg('Cannot remove Msg')
        }

    }

    if (!toy) return <h1 className='loading'>Loadings....</h1>
    return toy && <div className='flex-grow main-layout toy-details'>
        <h2>Toy Details </h2>
        <br />

        <h4>{toy.toyName}</h4>

        <p>Price: {toy.price}$</p>

        {!toy.inStock && <p className='out-stock'>Out of stock</p>}

        <div className='details-img'>
            {!toy.imgUrl && <img src={`https://robohash.org/${toy.toyName}?set=set2`} alt="" />}
            {toy.imgUrl && <img src={require(`../assets/img/${toy.imgUrl}`)} />}
        </div>

        <p>Desciption: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur ducimus sit ipsa mollitia sed ipsum odit? Distinctio reiciendis quo cupiditate neque at, itaque ducimus quod voluptates dignissimos adipisci beatae deleniti?</p>
        {/* <ul><span className='labels-headline'>Labels:</span>
            {toy.labels.map(label => <li className='labels-li' key={`${toy._id} + ${label}`}>{label}</li>)}
        </ul> */}

        <div className='add-msg-section'>
            <form onSubmit={onAddToyMsg}>
                <label htmlFor="toyMsg">Add toy msg:</label>
                <input type="text"
                    name="txt"
                    id="toyMsg"
                    value={msg.txt}
                    onChange={handleChange}
                />

                <button className='btn clean-btn'>Add</button>
            </form>
        </div>

        <hr />
        <div className='show-msg-section'>
            {(!toy.msgs) ? <h3>No msgs yet</h3> : <ToyMsgs toy={toy} onRemoveMsg={onRemoveMsg} />}
        </div>

        <div className='btn-back'>
            <Link to="/toy" className="btn">Back to List</Link>
        </div>
    </div >
}