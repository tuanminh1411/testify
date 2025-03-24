// src/QuizContext.jsx
import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [quizData, setQuizData] = useState({
    title: "",
    deadline: "",
    duration: 0,
    totalQuestions: 0,
    questions: [],
  });

  return (
    <QuizContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizContext.Provider>
  );
}
