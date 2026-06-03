// import { BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import AddGoal from "./pages/AddGoal";
// import ViewGoals from "./pages/ViewGoals";
// import AddTask from "./pages/AddTask";
// import ViewTasks from "./pages/ViewTasks";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import SelectGoalForTask from "./pages/SelectGoalForTask";

// function App(){
//  return(
//   <BrowserRouter>
//   <Routes>
//   <Route path="/" element={<Login/>}/>
//   <Route path="/register" element={<Register/>}/>
//   <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
//   <Route path="/goals" element={<ProtectedRoute><ViewGoals/></ProtectedRoute>}/>
//   <Route path="/add-goal/:id?" element={<ProtectedRoute><AddGoal/></ProtectedRoute>}/>

//   {/* New Task Flow */}
//   <Route path="/select-goal-for-task" element={<ProtectedRoute><SelectGoalForTask/></ProtectedRoute>} />
//   <Route path="/add-task/:goalId/:taskId?" element={<ProtectedRoute><AddTask/></ProtectedRoute>} />
//   <Route path="/tasks/:goalId" element={<ProtectedRoute><ViewTasks/></ProtectedRoute>} />

//   <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
// </Routes>
//   </BrowserRouter>
//  );
// }
// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddGoal from "./pages/AddGoal";
import ViewGoals from "./pages/ViewGoals";
import AddTask from "./pages/AddTask";
import ViewTasks from "./pages/ViewTasks";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectGoalForTask from "./pages/SelectGoalForTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
<Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/goals" element={<ProtectedRoute><ViewGoals /></ProtectedRoute>} />
        <Route path="/add-goal/:id?" element={<ProtectedRoute><AddGoal /></ProtectedRoute>} />

        {/* Task Flow */}
        <Route path="/select-goal-for-task" element={<ProtectedRoute><SelectGoalForTask /></ProtectedRoute>} />
       <Route path="/tasks" element={<ProtectedRoute><ViewTasks /></ProtectedRoute>} />
<Route path="/add-task/:goalId/:taskId?" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
<Route path="/add-goal/:id?" element={<ProtectedRoute><AddGoal /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;