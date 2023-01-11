import { Link, NavLink } from 'react-router-dom';



export function AppHeader() {

    return <header className="main-layout full">
        <div className="app-header">

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toy</NavLink>
            </nav>
            <Link to="/">
                <h3>ToyStore!</h3>
            </Link>
        </div>
    </header>
}
