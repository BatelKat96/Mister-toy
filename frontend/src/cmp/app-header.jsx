import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store/actions/user.action';
import { SET_USER } from '../store/reducers/user.reducer';
import { LoginSignup } from './login-signup';



export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    console.log('user:', user)

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }


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

            {user && <section className="user-info">
                <Link to={`user/${user._id}`}>
                    {user.imgUrl && <img className='user-img' src={user.imgUrl} />}
                    <p>{user.fullname}</p>
                </Link>
                <button onClick={onLogout} className="btn clean-btn">Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>}

        </div>
    </header>
}
