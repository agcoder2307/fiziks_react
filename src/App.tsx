import Login from "./components/Register";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Header from "./components/Header";
import Test from "./components/Test";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (!isAuth)
    return (
      <div>
        <Login />
      </div>
    );

  return (
    <div>
      <Header />
      <Test />
    </div>
  );
}

export default App;
