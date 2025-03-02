import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  // Example state for student data
  const [studentData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: '/path-to-profile-image.jpg',
    courses: ['Math 101', 'History 202', 'Science 303'],
    assignments: 3,
    completedAssignments: 2,
    upcomingEvents: ['Math test on 10th', 'History essay due on 12th'],
  });

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={studentData.profilePicture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-sky-600"
          />
          <h2 className="text-xl font-bold text-sky-700">{studentData.name}</h2>
          <p className="text-sm text-gray-500">{studentData.email}</p>
        </div>

        {/* Courses Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-sky-600">My Courses</h3>
          <ul className="space-y-2 text-gray-700">
            {studentData.courses.map((course, index) => (
              <li key={index} className="flex items-center">
                <span className="ml-2">{course}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assignments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-sky-600">Assignments</h3>
          <p className="text-sm text-gray-500">
            {studentData.completedAssignments} of {studentData.assignments} completed
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <button className="text-sky-600 hover:text-sky-800 focus:outline-none">
                View Pending Assignments
              </button>
            </li>
          </ul>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-sky-600">Upcoming Events</h3>
          <ul className="space-y-2 text-gray-700">
            {studentData.upcomingEvents.map((event, index) => (
              <li key={index} className="flex items-center">
                <span className="ml-2">{event}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex justify-between">
          <button className="text-sm text-sky-600 hover:text-sky-800 focus:outline-none">
            Edit Profile
          </button>
          <button className="text-sm text-red-600 hover:text-red-800 focus:outline-none">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
