import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardCoach from "./DashboardCoach";
import DashboardUser from "./DashboardUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/coach" replace />} />
        <Route
          path="/coach"
          element={
            <DashboardCoach
              coach={{ name: "John" }}
              users={[
                { id: 1, name: "Alice", goal: "Strength" },
                { id: 2, name: "Bob", goal: "Cardio" },
              ]}
            />
          }
        />
        <Route path="/user" element={<DashboardUser />} />
      </Routes>
    </Router>
  );
}

export default App;
