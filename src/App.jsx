import Layout from "./Layout";
import MovieDetails from "./components/MovieDetails";
import Home from "./pages/Home";
import { Popular } from "./pages/Popular";
import { TopRated } from "./pages/TopRated";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/contact" element={<TopRated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
