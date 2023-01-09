import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmp/toy-list'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadToys, removeToy, setFilter } from '../store/actions/toy.action'

export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])


    function onRemoveToy(toyId) {
        console.log('toyId from index:', toyId)

        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function onSetFilter(filter) {
    //     setFilter(filter)
    // }

    return <section>
        <h1>Toy store</h1>

        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
        />
    </section>


}