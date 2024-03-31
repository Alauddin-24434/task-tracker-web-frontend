
import Header from "./components/tasks/Header/Header";
import TaskDashboard from "./components/tasks/TaskDashboard/TaskDashboard";

function App() {
  return (
    <div className="relative h-auto bg-gray-400">
      {/* Content */}
      <div className="relative z-10 p-6">
        <Header />
        <div className="sm:border p-8">
          <TaskDashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
