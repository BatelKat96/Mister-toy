
import './assets/css/main.css';

import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';


import { HomePage } from './pages/home-page';
import { ToyIndex } from './pages/toy-index';
import { store } from './store/store';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          {/* <AppHeader /> */}
          <main>
            <Routes>
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/" element={<HomePage />} />
              {/* <Route element={<AboutUs />} path="/about" /> */}
              {/* <Route element={<ToyDetails />} path="/toy/:toyId" /> */}
              {/* <Route element={<ToyEdit />} path="/toy/edit/:toyId" /> */}

            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>

  )
}
