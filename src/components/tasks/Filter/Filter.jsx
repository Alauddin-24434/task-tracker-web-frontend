import React, { useState } from 'react';

const Filter = ({ applyFilters }) => {
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterChange = () => {
        applyFilters({ assignee, priority, startDate, endDate });
    };

    return (
        <div className="flex items-center space-x-4">
            <div>
                <label className="block mb-2">Assignee:</label>
                <input
                    type="text"
                    value={assignee}
                    onChange={(e) => {
                        setAssignee(e.target.value);
                        handleFilterChange();
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                />
            </div>
            <div>
                <label className="block mb-2">Priority:</label>
                <select
                    value={priority}
                    onChange={(e) => {
                        setPriority(e.target.value);
                        handleFilterChange();
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                >
                    <option value="">Select Priority</option>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                </select>
            </div>
            <div>
                <label className="block mb-2">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        handleFilterChange();
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                />
            </div>
            <div>
                <label className="block mb-2">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                        handleFilterChange();
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                />
            </div>
        </div>
    );
};

export default Filter;
