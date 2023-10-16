
import { Route, Routes } from 'react-router-dom';
import { MainRoutes } from './routes/mainRoutes';
import { createElement } from 'react';


const App = () => {
  return (
    <>
      <Routes>
      {
        MainRoutes.length === 0 ?
        <Route path='/' element={<div>There's no route here</div>} /> :
        MainRoutes.map((route, index) => 
          <Route 
            key={index} 
            path={route.path} 
            element={createElement(route.page)} 
          />
        )
      }
      </Routes>  
    </>
  )
}

export default App