// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";

import AddNewTest1 from "./components/teacher/AddNewTest1";
import AddNewTest2 from "./components/teacher/AddNewTest2";
import OnClassViewTest from "./components/teacher/OnClassViewTest";
import SupportScreen from "./components/teacher/SupportScreen";
import CreateSupportScreen from "./components/teacher/CreateSupportScreen";
import HomeScreen from "./components/teacher/HomeScreen";

import TestStart from "./components/student/TestStart";
import TestScreen from "./components/student/TestScreen";
import TestResult from "./components/student/TestResult";

import CreateTeacher from "./components/admin/CreateTeacher";
import CreateStudent from "./components/admin/CreateStudent";
function App() {
  return (
    <BrowserRouter>
      <Routes> 

        <Route path="/login" element={<LoginForm />} />

        <Route path="/home" element={<HomeScreen />} />
        <Route path="/addnewtest1" element={<AddNewTest1 />} />
        <Route path="/addnewtest2" element={<AddNewTest2 />} />
        <Route path="/onclass-viewtest" element={<OnClassViewTest />} />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/createsupport" element={<CreateSupportScreen />} />

        <Route path="/teststart" element={<TestStart />} />
        <Route path="/testscreen" element={<TestScreen />} />
        <Route path="/test-result" element={<TestResult />} />

        <Route path="/createteacher" element={<CreateTeacher />} />
        <Route path="/" element={<CreateStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;