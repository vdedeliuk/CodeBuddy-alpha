import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  streak: number;
  achievements: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: "Базова" | "Середня" | "Продвинута";
  duration: string;
  lessons: number;
  progress: number;
  currentLesson: number;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedCourse: Course | null;
  courses: Course[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectCourse: (courseId: string) => void;
  updateUserProgress: (xp: number, lesson?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockCourses: Course[] = [
  {
    id: "python-basics",
    title: "Python: Основи",
    description: "Вивчи основи програмування з Python",
    language: "Python",
    difficulty: "Базова",
    duration: "~4 год",
    lessons: 10,
    progress: 30,
    currentLesson: 3,
  },
  {
    id: "javascript-basics",
    title: "JavaScript: Основи",
    description: "Почни з JavaScript та веб-розробки",
    language: "JavaScript",
    difficulty: "Базова",
    duration: "~5 год",
    lessons: 12,
    progress: 0,
    currentLesson: 0,
  },
  {
    id: "python-advanced",
    title: "Python: Продвинутий",
    description: "Поглиблені знання Python та фреймворків",
    language: "Python",
    difficulty: "Продвинута",
    duration: "~8 год",
    lessons: 15,
    progress: 0,
    currentLesson: 0,
  },
  {
    id: "java-basics",
    title: "Java: Основи",
    description: "Основи об'єктно-орієнтованого програмування",
    language: "Java",
    difficulty: "Середня",
    duration: "~6 год",
    lessons: 14,
    progress: 0,
    currentLesson: 0,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(() => {
    const saved = localStorage.getItem("selectedCourse");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Симуляція API запиту
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Проста валідація (в реальному додатку це буде API)
    if (email && password.length >= 6) {
      const userData: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        level: 5,
        xp: 1250,
        streak: 5,
        achievements: 12,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Симуляція API запиту
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (name && email && password.length >= 6) {
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        level: 1,
        xp: 0,
        streak: 0,
        achievements: 0,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedCourse(null);
    localStorage.removeItem("user");
    localStorage.removeItem("selectedCourse");
  };

  const selectCourse = (courseId: string) => {
    const course = mockCourses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      localStorage.setItem("selectedCourse", JSON.stringify(course));
    }
  };

  const updateUserProgress = (xp: number, lesson?: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        xp: user.xp + xp,
        level: Math.floor((user.xp + xp) / 300) + 1,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      if (selectedCourse && lesson !== undefined) {
        const updatedCourse = {
          ...selectedCourse,
          currentLesson: lesson,
          progress: Math.round((lesson / selectedCourse.lessons) * 100),
        };
        setSelectedCourse(updatedCourse);
        localStorage.setItem("selectedCourse", JSON.stringify(updatedCourse));
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        selectedCourse,
        courses: mockCourses,
        login,
        register,
        logout,
        selectCourse,
        updateUserProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

