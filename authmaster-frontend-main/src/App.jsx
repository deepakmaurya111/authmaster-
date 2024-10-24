import Routes from "./Routes";
import UserAuth from "./context/UserAuth";
function App() {
  // Set default value of profile : Empty
  // Check all functionalities and submit it
  return (
    <>
      <UserAuth>
        <Routes />
      </UserAuth>
    </>
  );
}

export default App;
