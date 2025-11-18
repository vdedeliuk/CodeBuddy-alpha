import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { CodeEditor } from "./components/CodeEditor";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'editor'>(() => {
    // Перевіряємо чи є збережений стан автентифікації
    const saved = localStorage.getItem("user");
    return saved ? 'dashboard' : 'landing';
  });
  const { isAuthenticated } = useApp();

  const handleNavigate = (page: string) => {
    // Захист маршрутів - якщо не авторизований, перенаправляємо на landing
    if ((page === 'dashboard' || page === 'editor') && !isAuthenticated) {
      setCurrentPage('landing');
      return;
    }
    setCurrentPage(page as 'landing' | 'dashboard' | 'editor');
  };

  // Автоматичне перенаправлення після логіну
  useEffect(() => {
    if (isAuthenticated && currentPage === 'landing') {
      setCurrentPage('dashboard');
    } else if (!isAuthenticated && (currentPage === 'dashboard' || currentPage === 'editor')) {
      setCurrentPage('landing');
    }
  }, [isAuthenticated]);

  return (
    <>
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'editor' && <CodeEditor onNavigate={handleNavigate} />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider children={<AppContent />} />
  );
}
