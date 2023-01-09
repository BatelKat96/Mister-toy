import { useEffect, useRef, useState } from 'react'
import { toyService } from '../services/toy-service'
import { utilService } from '../services/util.service'

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="car-filter full main-layout">
        <h4>Toy Filter</h4>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="toyName">Toy name:</label>
            <input type="text"
                id="toyName"
                name="txt"
                placeholder="By toy name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <button hidden>Filter</button>
        </form>

    </section>
}

// function getDefaultFilter() {
//     return { txt: '', maxPrice: '', inStock: '', label: '' }
// }
