import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Assuming you're using lucide-react icons

const Timetable: React.FC = () => {
  const navigate = useNavigate();
  const [completedSlots, setCompletedSlots] = useState<{ [key: string]: boolean }>({});
  const [currentDay, setCurrentDay] = useState<string>('');

  const timetableData = [
    {
      day: 'Monday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'Data Structures', color: 'bg-blue-300' },
        { time: '11:00 AM - 12:00 PM', subject: 'Database Management', color: 'bg-orange-300' },
      ]
    },
    {
      day: 'Tuesday',
      slots: [
        { time: '10:00 AM - 11:00 AM', subject: 'Functional Programming', color: 'bg-green-300' },
        { time: '1:00 PM - 2:00 PM', subject: 'Data Structures', color: 'bg-blue-300' },
      ]
    },
    {
      day: 'Wednesday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'Database Management', color: 'bg-orange-300' },
        { time: '3:00 PM - 4:00 PM', subject: 'Functional Programming', color: 'bg-green-300' },
      ]
    },
    // Add more days as needed
  ];

  // Determine today's date and the current day of the week
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    setCurrentDay(dayOfWeek);
  }, []);

  const handleCheckboxChange = (day: string, index: number) => {
    const key = `${day}-${index}`;
    setCompletedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/home'); // Assuming the dashboard is accessible at "/dashboard"
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back to Dashboard Link */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Timetable</h1>
          </div>
        </div>

        {/* Calendar for Current Month */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Monthly Calendar</h3>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <div key={idx} className="text-center text-gray-700">{day}</div>
            ))}
            {/* Display simple calendar dates for the month */}
            {[...Array(30)].map((_, index) => {
              const date = index + 1;
              return (
                <div
                  key={date}
                  className={`text-center p-2 cursor-pointer ${date === new Date().getDate() ? 'bg-yellow-300' : ''}`}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {timetableData.map((day, index) => (
            <div
              key={index}
              className={`space-y-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${currentDay === day.day.toLowerCase() ? 'border-l-4 border-blue-500' : ''}`}
            >
              <h2 className="text-xl font-semibold text-gray-900">{day.day}</h2>
              <div className="space-y-3">
                {day.slots.map((slot, slotIndex) => {
                  const key = `${day.day}-${slotIndex}`;
                  return (
                    <div
                      key={slotIndex}
                      className={`p-4 rounded-lg ${slot.color} text-white ${completedSlots[key] ? 'bg-green-500' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-lg">{slot.time}</p>
                          <p className="text-sm">{slot.subject}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={completedSlots[key] || false}
                          onChange={() => handleCheckboxChange(day.day, slotIndex)}
                          className="ml-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
