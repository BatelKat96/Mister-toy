import { Link, NavLink } from 'react-router-dom';



export function AppHeader() {

    return <header className="main-layout full">
        <div className="app-header">

            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toy</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
            <Link to="/">
                <h3>ToyStore!</h3>
            </Link>
        </div>
    </header>
}
