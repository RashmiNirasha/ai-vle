"use client"

import type React from "react"
import { useState } from "react"

const ProfilePage: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [studentData, setStudentData] = useState({
    studentID: "20241234",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profilePicture: "/Images/profile.jpeg", // ✅ Default profile picture
    bio: "A passionate learner and technology enthusiast.",
    description: "Currently studying computer science and interested in AI development.",
    university: "Harvard University",
    degree: "Bachelor of Science in Computer Science",
    faculty: "School of Engineering and Applied Sciences",
    advisor: "Dr. Jane Smith",
    year: "2025",
    enrollmentStatus: "Full-time",
    gpa: "3.85",
    skills: ["JavaScript", "React", "Python", "Machine Learning"],
    achievements: ["Dean's List 2023", "Hackathon Winner"],
    certifications: ["AWS Certified Cloud Practitioner", "Google Data Analytics"],
    links: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      portfolio: "https://johndoe.dev",
    },
    dateJoined: new Date().toISOString().split("T")[0],
    courses: [
      { id: "CS101", name: "Introduction to Computer Science", grade: "A", credits: 4, status: "Completed" },
      { id: "MATH202", name: "Advanced Calculus", grade: "A-", credits: 3, status: "In Progress" },
      { id: "ENG303", name: "Technical Writing", grade: "B+", credits: 3, status: "In Progress" },
      { id: "AI404", name: "Artificial Intelligence", grade: "Pending", credits: 4, status: "Upcoming" },
    ],
    assignments: [
      { id: 1, title: "CS101 Final Project", dueDate: "2023-12-15", status: "Completed", grade: "A" },
      { id: 2, title: "MATH202 Problem Set", dueDate: "2023-12-10", status: "Completed", grade: "A-" },
      { id: 3, title: "ENG303 Essay", dueDate: "2023-12-20", status: "Pending", grade: "Pending" },
    ],
    upcomingEvents: [
      { id: 1, title: "Math Midterm Exam", date: "2023-12-18", location: "Room 302" },
      { id: 2, title: "CS Department Meetup", date: "2023-12-22", location: "Student Center" },
    ],
    activityLog: [
      { id: 1, activity: "Completed Science Quiz", date: "2023-12-01" },
      { id: 2, activity: "Joined AI Research Group", date: "2023-11-28" },
      { id: 3, activity: "Submitted Math Assignment", date: "2023-11-25" },
    ],
    academicProgress: {
      creditsCompleted: 65,
      creditsRequired: 120,
      majorRequirements: 75,
      electivesCompleted: 15,
    },
  });

  // ✅ Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setStudentData((prev) => ({ ...prev, profilePicture: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value })
  }

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...studentData.skills]
    updatedSkills[index] = value
    setStudentData({ ...studentData, skills: updatedSkills })
  }

  const addSkill = () => {
    setStudentData({ ...studentData, skills: [...studentData.skills, ""] })
  }

  const removeSkill = (index: number) => {
    const updatedSkills = [...studentData.skills]
    updatedSkills.splice(index, 1)
    setStudentData({ ...studentData, skills: updatedSkills })
  }

  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...studentData.achievements]
    updatedAchievements[index] = value
    setStudentData({ ...studentData, achievements: updatedAchievements })
  }

  const addAchievement = () => {
    setStudentData({ ...studentData, achievements: [...studentData.achievements, ""] })
  }

  const removeAchievement = (index: number) => {
    const updatedAchievements = [...studentData.achievements]
    updatedAchievements.splice(index, 1)
    setStudentData({ ...studentData, achievements: updatedAchievements })
  }

  const handleLinkChange = (key: keyof typeof studentData.links, value: string) => {
    setStudentData({
      ...studentData,
      links: {
        ...studentData.links,
        [key]: value,
      },
    })
  }

  const toggleEditMode = () => {
    setEditing(!editing)
  }

  const toggleFocusMode = () => {
    setFocusMode(!focusMode)
  }

  const progressPercentage = Math.round(
    (studentData.academicProgress.creditsCompleted / studentData.academicProgress.creditsRequired) * 100,
  )

  return (
    <div className={`min-h-screen ${focusMode ? "bg-white" : "bg-gradient-to-b from-blue-50 to-slate-100"} flex flex-col w-full transition-colors duration-300`} >

      <div className="w-full flex justify-center p-4 md:p-6">
        <div className="w-full max-w-7xl">
          {/* Header Section */}
          <div className="mb-6 overflow-hidden rounded-xl shadow-md bg-white">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <div className="relative pt-0 pb-6 px-6">

              <div className="flex flex-col md:flex-row gap-6 -mt-16 items-start md:items-end">
                <div className="h-32 w-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-100 relative">
                  <img 
                    src={studentData.profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  
                  {editing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div className="text-white flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs mt-1">Upload</span>
                      </div>
                    </label>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    {editing ? (
                      <div className="flex gap-2">
                        <input
                          name="firstName"
                          value={studentData.firstName}
                          onChange={handleInputChange}
                          className="text-2xl font-bold h-10 w-32 px-2 border rounded"
                        />
                        <input
                          name="lastName"
                          value={studentData.lastName}
                          onChange={handleInputChange}
                          className="text-2xl font-bold h-10 w-32 px-2 border rounded"
                        />
                      </div>
                    ) : (
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {studentData.firstName} {studentData.lastName}
                      </h2>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {editing ? (
                        <input
                          name="studentID"
                          value={studentData.studentID}
                          onChange={handleInputChange}
                          className="w-28 h-6 text-xs px-1 border rounded"
                        />
                      ) : (
                        `ID: ${studentData.studentID}`
                      )}
                    </span>
                  </div>

                  {editing ? (
                    <textarea
                      name="bio"
                      value={studentData.bio}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-500">{studentData.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      {studentData.degree}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      {studentData.year}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      {studentData.enrollmentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:flex-row md:items-center mt-4 md:mt-0">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={focusMode} onChange={toggleFocusMode} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-700">Focus Mode</span>
                    </label>
                  </div>

                  <button
                    onClick={toggleEditMode}
                    className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                      editing
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    {editing ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Save
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Profile Overview
                </button>
                <button
                  onClick={() => setActiveTab("academics")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "academics"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Academics
                </button>
                <button
                  onClick={() => setActiveTab("activities")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "activities"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Activities
                </button>
              </nav>
            </div>

            {/* Academics Tab */}
            {activeTab === "academics" && (
              <div className="space-y-6 mt-6">
                {/* Academic Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.969 7.969 0 017.5 4c-1.255 0-2.443.29-3.5.804z" />
                      </svg>
                      Academic Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">University</label>
                        {editing ? (
                          <input
                            name="university"
                            value={studentData.university}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.university}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Faculty</label>
                        {editing ? (
                          <input
                            name="faculty"
                            value={studentData.faculty}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.faculty}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Degree</label>
                        {editing ? (
                          <input
                            name="degree"
                            value={studentData.degree}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.degree}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Advisor</label>
                        {editing ? (
                          <input
                            name="advisor"
                            value={studentData.advisor}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.advisor}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        {editing ? (
                                <input
                              name="year"
                              value={studentData.year}
                              onChange={handleInputChange}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <p className="text-sm font-medium">{studentData.year}</p>
                          )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">GPA</label>
                        {editing ? (
                          <input
                            name="gpa"
                            value={studentData.gpa}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.gpa}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Courses */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.969 7.969 0 017.5 4c-1.255 0-2.443.29-3.5.804z" />
                      </svg>
                      Courses
                    </h3>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-gray-100 p-3 text-xs font-medium">
                      <div className="col-span-2">Course ID</div>
                      <div className="col-span-5">Course Name</div>
                      <div className="col-span-2">Credits</div>
                      <div className="col-span-1">Grade</div>
                      <div className="col-span-2">Status</div>
                    </div>
                    {studentData.courses.map((course, index) => (
                      <div
                        key={course.id}
                        className={`grid grid-cols-12 p-3 text-sm ${
                          index !== studentData.courses.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="col-span-2 font-medium">{course.id}</div>
                        <div className="col-span-5">{course.name}</div>
                        <div className="col-span-2">{course.credits}</div>
                        <div className="col-span-1">{course.grade}</div>
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              course.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : course.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Progress */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                      Academic Progress
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">Degree Completion</label>
                        <span className="text-sm font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Credits Completed</label>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">
                            {studentData.academicProgress.creditsCompleted} of{" "}
                            {studentData.academicProgress.creditsRequired}
                          </span>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (studentData.academicProgress.creditsCompleted /
                                studentData.academicProgress.creditsRequired) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.round((studentData.academicProgress.creditsCompleted / studentData.academicProgress.creditsRequired) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Major Requirements</label>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm">{studentData.academicProgress.majorRequirements}%</span>
                          <span className="text-sm font-medium">{studentData.academicProgress.majorRequirements}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${studentData.academicProgress.majorRequirements}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === "activities" && (
              <div className="space-y-6 mt-6">
                {/* Assignments */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Assignments
                    </h3>
                  </div>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-gray-100 p-3 text-xs font-medium">
                      <div className="col-span-6">Assignment</div>
                      <div className="col-span-2">Due Date</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Grade</div>
                    </div>
                    {studentData.assignments.map((assignment, index) => (
                      <div
                        key={assignment.id}
                        className={`grid grid-cols-12 p-3 text-sm ${
                          index !== studentData.assignments.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="col-span-6 font-medium">{assignment.title}</div>
                        <div className="col-span-2">{assignment.dueDate}</div>
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              assignment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {assignment.status}
                          </span>
                        </div>
                        <div className="col-span-2">{assignment.grade}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upcoming Events
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {studentData.upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg border">
                        <div className="bg-blue-100 text-blue-600 rounded-md p-2 h-12 w-12 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex gap-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {event.date}
                            </span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Log */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Activity Log
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {studentData.activityLog.map((activity, index) => (
                      <div key={activity.id} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-blue-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          {index < studentData.activityLog.length - 1 && <div className="h-full w-px bg-gray-200" />}
                        </div>
                        <div className="space-y-1 pt-1">
                          <p className="text-sm font-medium leading-none">{activity.activity}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6 mt-6">
                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        {editing ? (
                          <input
                            name="firstName"
                            value={studentData.firstName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        {editing ? (
                          <input
                            name="lastName"
                            value={studentData.lastName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        {editing ? (
                          <input
                            name="email"
                            value={studentData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Student ID</label>
                        {editing ? (
                          <input
                            name="studentID"
                            value={studentData.studentID}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.studentID}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date Joined</label>
                        <p className="text-sm font-medium">{studentData.dateJoined}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Enrollment Status</label>
                        {editing ? (
                          <input
                            name="enrollmentStatus"
                            value={studentData.enrollmentStatus}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-sm font-medium">{studentData.enrollmentStatus}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    {editing ? (
                      <textarea
                        name="bio"
                        value={studentData.bio}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm">{studentData.bio}</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    {editing ? (
                      <textarea
                        name="description"
                        value={studentData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm">{studentData.description}</p>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      Skills
                    </h3>
                  </div>
                  {editing ? (
                    <div className="space-y-3">
                      {studentData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            value={skill}
                            onChange={(e) => handleSkillChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSkill}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Skill
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {studentData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Achievements
                    </h3>
                  </div>
                  {editing ? (
                    <div className="space-y-3">
                      {studentData.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            value={achievement}
                            onChange={(e) => handleAchievementChange(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeAchievement(index)}
                            className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button  type="button" onClick={addAchievement} className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Add More +
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-2 list-disc pl-5">
                      {studentData.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Links */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Links
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {editing ? (
                        <input
                          value={studentData.links.github}
                          onChange={(e) => handleLinkChange("github", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <a
                          href={studentData.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline text-blue-600"
                        >
                          {studentData.links.github}
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-1-.02-2.278-1.39-2.278-1.39 0-1.601 1.084-1.601 2.205v4.25H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {editing ? (
                        <input
                          value={studentData.links.linkedin}
                          onChange={(e) => handleLinkChange("linkedin", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <a
                          href={studentData.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline text-blue-600"
                        >
                          {studentData.links.linkedin}
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {editing ? (
                            <input
                              value={studentData.links.portfolio}
                              onChange={(e) => handleLinkChange("portfolio", e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          ) : (
                            <a
                              href={studentData.links.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:underline text-blue-600"
                            >
                              {studentData.links.portfolio}
                            </a>
                          )}
                    </div>
                  </div>
                </div>

                {/* Academic Progress */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      Academic Progress
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Degree Completion</span>
                        <span className="font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Credits</p>
                        <p className="font-medium">
                          {studentData.academicProgress.creditsCompleted}/
                          {studentData.academicProgress.creditsRequired}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">GPA</p>
                        <p className="font-medium">{studentData.gpa}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upcoming Events
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {studentData.upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-2">
                        <div className="bg-blue-100 text-blue-600 rounded p-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-gray-500">
                            {event.date} • {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assignments */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Assignments
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {studentData.assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-start gap-2">
                        <div
                          className={`rounded p-1.5 ${
                            assignment.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {assignment.status === "Completed" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{assignment.title}</p>
                          <p className="text-xs text-gray-500">
                            Due: {assignment.dueDate} •
                            {assignment.status === "Completed" ? ` Grade: ${assignment.grade}` : " Pending"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

