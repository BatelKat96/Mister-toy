export function ToyPreview({ toy }) {
    return <article>
        <h3>{toy.toyName}</h3>
        <p>Price: {toy.price}$</p>
        {!toy.inStock && <p className='out-stock'>Out of stock</p>}
        <div className='preview-img'>

            <img src={require(`../assets/img/${toy.imgUrl}`)} />
        </div>
    </article>

}