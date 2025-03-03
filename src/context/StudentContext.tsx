import React, { createContext, useContext, useState } from "react";

interface StudentData {
  firstName: string;
  lastName: string;
  profilePicture: string; // ✅ Ensure profilePicture is included
  bio: string;
}

interface StudentContextType {
  studentData: StudentData;
  setStudentData: React.Dispatch<React.SetStateAction<StudentData>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<StudentData>({
    firstName: "John",
    lastName: "Doe",
    profilePicture: "/Images/profile.jpeg", 
    bio: "A passionate learner and technology enthusiast.",
  });

  return (
    <StudentContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
