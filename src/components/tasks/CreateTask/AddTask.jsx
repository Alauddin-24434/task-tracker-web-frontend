import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAsync } from '../../../features/tasks/tasksSlice';
import './AddTask.css'; // Import CSS for modal styling

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addTaskAsync({
        title,
        description,
        assignee,
        priority,
        status: "Pending"
      }));
      setIsOpen(false);
      setTitle('');
      setDescription('');
      setAssignee('');
      setPriority('');
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    <div>
      <button className='bg-blue-500 px-4 hover:bg-blue-600  py-1 rounded-md text-white' onClick={() => setIsOpen(true)}>Add Task</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
           
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Assignee Name"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
              <div className="button-container ">
                <button type="submit" className="submit-button">Submit</button>
                <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
