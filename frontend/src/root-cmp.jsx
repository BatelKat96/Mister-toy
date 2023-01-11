
import './assets/css/main.css';
import './assets/scss/main.scss';

import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';


import { HomePage } from './pages/home-page';
import { ToyIndex } from './pages/toy-index';
import { store } from './store/store';
import { ToysDetails } from './pages/toy-details';
import { ToyEdit } from './pages/toy-edit';
import { AppFooter } from './cmp/app-footer';
import { AppHeader } from './cmp/app-header';


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main className="full main-section main-layout">
            <Routes>
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/" element={<HomePage />} />
              {/* <Route element={<AboutUs />} path="/about" /> */}
              <Route element={<ToysDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />

            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>

  )
}
