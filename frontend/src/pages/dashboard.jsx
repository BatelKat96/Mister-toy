import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LabelsCountChart } from '../cmp/toy-labels-chart';
import { ToysPriceChart } from '../cmp/toy-price-chart';

import { loadToys } from '../store/actions/toy.action';

export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    useEffect(() => {
        loadToys()
    }, [])

    function getChartsData() {
        const chartsData = toys.reduce(
            (acc, toy) => {
                if (!acc.toysPriceMap[toy.toyName]) (acc.toysPriceMap[toy.toyName]) = toy.price
                toy.labels.forEach((label) => {
                    acc.labelsCountMap[label] = acc.labelsCountMap[label] ? ++acc.labelsCountMap[label] : 1

                })

                return acc
            },
            { labelsCountMap: {}, toysPriceMap: {} }
        )


        return chartsData
    }

    const { toysPriceMap, labelsCountMap } = getChartsData()

    return (
        <section className="dashboard">
            <h2>Toy Map</h2>
            <br />
            <div className="charts flex">
                <LabelsCountChart dataMap={labelsCountMap} />
                <ToysPriceChart dataMap={toysPriceMap} />
            </div>
        </section>
    )
}



