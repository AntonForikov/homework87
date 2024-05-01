import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import Register from './containers/User/Register';
import Login from './containers/User/Login';
import Container from '@mui/material/Container';
import TrackHistory from './containers/Tracks/TrackHistory';
function App() {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth='xl'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/trackHistory' element={<TrackHistory />}/>
            <Route path='artist/:id' element={<Albums/>}/>
            <Route path='album/:albumId' element={<Tracks/>}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="*" element={<h1>Not found</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
