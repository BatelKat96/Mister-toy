export function ToyPreview({ toy }) {
    return <article className='toy-preview'>
        <h3>{toy.toyName}</h3>
        <p>Price: {toy.price}$</p>
        {!toy.inStock && <p className='out-stock'>Out of stock</p>}
        <div className='preview-img'>
            {!toy.imgUrl && <img src={`https://robohash.org/${toy.toyName}?set=set2`} alt="" />}
            {toy.imgUrl && <img src={require(`../assets/img/${toy.imgUrl}`)} />}
        </div>
    </article>

}