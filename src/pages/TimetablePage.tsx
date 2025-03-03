import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Timetable: React.FC = () => {
  const navigate = useNavigate();
  const [completedSlots, setCompletedSlots] = useState<{ [key: string]: boolean }>({});
  const [currentDay, setCurrentDay] = useState<string>("");
  const [events, setEvents] = useState<{ date: number; title: string; description: string; day: string }[]>([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "", description: "", day: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.toLocaleString("en-us", { weekday: "long" });
    setCurrentDay(dayOfWeek);
  }, []);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleCheckboxChange = (day: string, index: number) => {
    const key = `${day}-${index}`;
    setCompletedSlots((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBackToDashboard = () => navigate("/home");

  const handleAddEvent = () => {
    if (!newEvent.date || !newEvent.title || !newEvent.day) return;
    setEvents([...events, { ...newEvent, date: Number(newEvent.date) }]);
    setNewEvent({ date: "", title: "", description: "", day: "" });
    setShowModal(false);
  };

  return (
    <div>
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Timetable</h1>
            <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Event
            </button>
          </div>

          {/* Calendar with Events */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">{currentDate.toLocaleString("en-us", { month: "long" })} {currentYear}</h3>
            <div className="grid grid-cols-7 gap-2 mt-4">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="text-center font-semibold text-gray-700">{day}</div>
              ))}

              {/* Empty slots for previous month days */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="text-center p-2"></div>
              ))}

              {/* Dates of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const date = index + 1;
                const event = events.find((e) => e.date === date);
                return (
                  <div key={date} className={`text-center p-2 rounded-md cursor-pointer relative ${date === currentDate.getDate() ? "bg-yellow-300 font-bold" : ""}`}>
                    {date}
                    {event && (
                      <div className="absolute top-6 left-0 w-full text-xs bg-blue-500 text-white px-2 py-1 rounded-md shadow-md">
                        {event.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
              <div key={index} className={`space-y-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${currentDay === day ? "border-l-4 border-blue-500" : ""}`}>
                <h2 className="text-xl font-semibold text-gray-900">{day}</h2>
                <div className="space-y-3">
                  {/* User-Added Events */}
                  {events
                    .filter((event) => event.day === day)
                    .map((event, eventIndex) => (
                      <div key={eventIndex} className="p-4 rounded-lg bg-blue-500 text-white">
                        <p className="font-medium text-lg">{event.title}</p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Event</h3>
            <input type="number" placeholder="Date (1-30)" className="w-full p-2 border rounded mb-2" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <input type="text" placeholder="Title" className="w-full p-2 border rounded mb-2" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <textarea placeholder="Description" className="w-full p-2 border rounded mb-2" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
            <select className="w-full p-2 border rounded mb-4" value={newEvent.day} onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}>
              <option value="">Select Day</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <button onClick={handleAddEvent} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Add</button>
            <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
