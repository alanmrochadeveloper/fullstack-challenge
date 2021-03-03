import TripPresenter from "./TripPresenter/TripPresenter";

function App() {
  const scheme: string | undefined = process.env.REACT_APP_SCHEME;
  const baseUrl: string | undefined = process.env.REACT_APP_BASE_URL;
  const port: string | undefined = process.env.REACT_APP_PORT;
  const basePath: string | undefined = process.env.REACT_APP_BASE_PATH;
  const api: string = `${scheme}://${baseUrl}:${port}/${basePath}`;
  const logoSVG : string | undefined = process.env.REACT_APP_LOGO_SVG;
  const worldFlag: string | undefined = process.env.REACT_APP_WORLD_FLAG;
  return (
    <div className="App">
      <TripPresenter api={api} logoSVG={logoSVG} worldFlag={worldFlag}/>
    </div>
  );
}

export default App;
