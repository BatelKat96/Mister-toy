import { useEffect, useState } from 'react';
import { toyService } from '../services/toy-service';


export function ToySort({ onSetSort }) {


    const [sortByToEdit, setSortByToEdit] = useState(toyService.getDefaultSort())

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleSortChange({ target }) {
        let { value, name: field, type } = target
        console.log('value:', value)
        console.log('field:', field)

        value = type === 'checkbox' ? (target.checked ? -1 : 1) : value
        setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
        console.log('sortByToEdit:', sortByToEdit)

    }

    return <section className='sort-main-section'>
        <h4>Toy Sort</h4>
        <div className='sort-section'>

            <label htmlFor='desc'>Descending:
                <input
                    name='desc'
                    id='desc'
                    type='checkbox'
                    value={sortByToEdit.desc}
                    onChange={handleSortChange}
                />
            </label>
            <select
                name='sortByCat'
                value={sortByToEdit.sortByCat}
                onChange={handleSortChange}
            >
                <option value=''>Select Sorting</option>
                <option value='toyName'>Toy name</option>
                <option value='price'>Price</option>
                <option value='createdAt'>CreatedAt</option>
            </select>
        </div>
    </section>
}