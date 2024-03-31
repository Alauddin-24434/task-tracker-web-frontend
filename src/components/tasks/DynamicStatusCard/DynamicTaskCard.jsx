/* eslint-disable react/prop-types */
import TaskSatusCard from '../SingleTaskCard/TaskSatusCard';
import { useState, useEffect } from 'react';

const DynamicTaskCard = ({ tasks, status }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to determine color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#ffcc00'; // Yellow
            case 'In-progress':
                return '#3399ff'; // Blue
            case 'Completed':
                return '#00cc00'; // Green
            case 'Deployed':
                return '#800080'; // Purple
            case 'Deferred':
                return '#ff0000'; // Red
            default:
                return '#666666'; // Default color
        }
    };

    return (
        <div className="rounded-lg  border border-gray-300 h-screen" style={{ width: '300px', overflowY: 'auto' }}>
            {/* Fixed bar */}
            <div className={`sticky top-0 ${isSticky ? 'shadow-md' : ''}`} style={{ backgroundColor: getStatusColor(status) }}>
                <h3 className="text-lg text-center py-1 rounded-t-lg font-semibold mb-2" style={{ color: '#ffffff', textTransform: 'uppercase', padding: '0.5rem' }}>
                    {status && status.toUpperCase()}
                </h3>
            </div>
            {/* End of fixed bar */}
            <div className="p-4 mb-4">
                {/* Rendering fetched task data */}
                <ul className="flex flex-col gap-2">
                    {tasks?.map(task => (
                        <TaskSatusCard key={task._id} task={task} taskStatus={status} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DynamicTaskCard;
