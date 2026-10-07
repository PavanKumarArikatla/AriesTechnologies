import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import State from './components/State';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <State />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
