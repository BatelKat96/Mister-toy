
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmp/toy-filter'
import { ToyList } from '../cmp/toy-list'
import { ToySort } from '../cmp/toy-sort'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadToys, removeToy, setFilter, setSort } from '../store/actions/toy.action'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        }
        catch {
            showErrorMsg('Cannot remove toy')
        }
    }

    function onSetFilter(filter) {
        setFilter(filter)
    }

    function onSetSort(sort) {
        console.log('sort from index:', sort)
        setSort(sort)
    }

    return <section className='toy-index main-layout '>
        <h1>Toy store</h1>
        <div className='toy-feature-section'>

            <Link to={`/toy/edit`}>  <button className="add-toy-btn clean-btn btn">Add Toy</button></Link>
            <ToyFilter onSetFilter={onSetFilter} />
            <ToySort onSetSort={onSetSort} />
        </div>
        {isLoading && <p className='loading'>Loading...</p>}
        {/* {isLoading && <span className='loader'></span>} */}
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
        />
    </section>


}