import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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


    const dispatch = useDispatch()

    useEffect(() => {

        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])


    // function onLoadToys(filterBy) {
    //     loadToys(filterBy)
    //         .then(() => {
    //             // showSuccessMsg('Cars loaded')
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot load toys')
    //         })
    // }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filter) {
        setFilter(filter)
    }

    function onSetSort(sort) {
        console.log('sort from index:', sort)

        setSort(sort)
    }

    return <section>
        <h1>Toy store</h1>


        <ToyFilter onSetFilter={onSetFilter} />
        <ToySort onSetSort={onSetSort} />
        {isLoading && <p className='loading'>Loading...</p>}
        {/* {isLoading && <span className='loader'></span>} */}
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
        />
    </section>


}