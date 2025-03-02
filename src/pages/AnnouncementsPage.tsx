import React, { useState } from 'react';
import { 
  Bell
} from 'lucide-react';
import Navbar from '../pages/navBar';

const Announcements: React.FC = () => {
  const [notifications] = useState([
    { id: 1, text: 'Assignment due: Data Structures - Lab Report 3', deadline: '2 days left' },
    { id: 2, text: 'New Material: Database Management Systems', time: '1 hour ago' },
  ]);

  return (
    <>
      <Navbar notifications={notifications.length} />
      
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </h2>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-800">{notification.text}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {notification.deadline || notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
