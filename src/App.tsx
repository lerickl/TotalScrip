
import Home from './components/home'
import Login from './components/login'
 
import {Route, Routes }from 'react-router-dom'
 
function App(): JSX.Element {
  return (
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App
