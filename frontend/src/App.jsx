import {
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import LoadingOverlay from "./components/LoadingOverlay";
import { Toaster } from "react-hot-toast";

function App() {

  return (
  <>

    <Toaster position="top-right" reverseOrder={false} />
      <LoadingOverlay />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/goals"
          element={<Goals />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Routes>

  </>  
  );
}

export default App;