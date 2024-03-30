import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksAsync } from '../../../features/tasks/tasksSlice';
import DynamicTaskCard from '../DynamicStatusCard/DynamicTaskCard';
import './TaskDashboard.css'
import AddTask from '../CreateTask/AddTask';


const TaskDashboard = () => {
    const dispatch = useDispatch();
    const allTasks = useSelector(state => state.tasks.tasks);

    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');

    useEffect(() => {
        // Fetch tasks when the component mounts
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    const filteredTasks = allTasks.filter(task => {
        // Convert assignee input value to lowercase
        const lowercaseAssignee = assignee.toLowerCase();

        // If only priority filter is applied
        if (priority !== '' && assignee === '') {
            return task.priority === priority;
        }
        // If only assignee filter is applied
        if (priority === '' && assignee !== '') {
            // Convert task assignee to lowercase for comparison
            return task.assignee.toLowerCase().includes(lowercaseAssignee);
        }
        // If both priority and assignee filters are applied
        if (priority !== '' && assignee !== '') {
            return task.priority === priority && task.assignee.toLowerCase().includes(lowercaseAssignee);
        }
        // If date range filter is applied
        if (startDateFilter && endDateFilter) {
            const taskDueDate = new Date(task.dueDate);
            return taskDueDate >= new Date(startDateFilter) && taskDueDate <= new Date(endDateFilter);
        }
        // If no filters are applied, show all tasks
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto  ">

            {/* heading */}
          
                <div className='flex items-center my-6 flex-col-reverse lg:flex-row lg:justify-between  lg:items-center'>

                    {/* filter */}
                    <div className='flex flex-col items-center lg:flex-row gap-4 lg:items-center '>
                        <span className='hidden lg:block'>Filter:</span>
                        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-4">
                            <div className="input-container">

                                <input
                                    type="text"
                                    placeholder="Assignee"
                                    value={assignee}
                                    onChange={(e) => setAssignee(e.target.value)}
                                    className="custom-input"
                                />
                            </div>
                            <div className="input-container">

                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="custom-select"
                                >
                                    <option value="">Priority</option>
                                    <option value="P0">P0</option>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                                    <option value="P3">P3</option>
                                </select>
                            </div>

                            <div className="input-container">

                                <input
                                    type="date"
                                    value={startDateFilter}
                                    onChange={(e) => setStartDateFilter(e.target.value)}
                                    className="custom-input"
                                />
                            </div>
                            <div className="input-container">

                                <input
                                    type="date"
                                    value={endDateFilter}
                                    onChange={(e) => setEndDateFilter(e.target.value)}
                                    className="custom-input"
                                />
                            </div>
                        </div>
                    </div>
                
                    <AddTask/>
        
                 
                  
                </div>

                  {/* short */}
       
            <div className='lg:flex hidden gap-4 mb-4 items-center'>
                        <span>Short:</span>
                        <div className="input-container">

                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="custom-select"
                            >
                                <option value="">Priority</option>
                                <option value="P0">P0</option>
                                <option value="P1">P1</option>
                                <option value="P2">P2</option>
                                <option value="P3">P3</option>
                            </select>
                        </div>
                    </div>



            <div className="flex flex-col items-center lg:flex-row lg:items-start  gap-4">
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Pending")} status="Pending" />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "In-progress")} status='In-progress' />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Completed")} status="Completed" />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Deployed")} status="Deployed" />
                <DynamicTaskCard tasks={filteredTasks.filter(task => task.status === "Deferred")} status="Deferred" />
            </div>
        </div>
    );
};

export default TaskDashboard;
