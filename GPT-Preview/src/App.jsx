import LandingPage from "./home";
import Preview from "./preview";

function App() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // if id exists → preview page
  if (id) {
    return <Preview />;
  }

  // otherwise → home page
  return <LandingPage />;
}

export default App;
