import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Home, 
  BookOpen, 
  Code2, 
  Trophy, 
  Settings, 
  Flame, 
  Target,
  Clock,
  Award,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CourseSelection } from "./CourseSelection";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user, logout, selectedCourse } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!user) {
    return null;
  }

  const userName = user.name;
  const currentLevel = user.level;
  const currentXP = user.xp;
  const nextLevelXP = currentLevel * 300;
  const streak = user.streak;
  
  const currentModule = selectedCourse?.title || "Виберіть курс";
  const currentLesson = selectedCourse?.currentLesson || 0;
  const totalLessons = selectedCourse?.lessons || 0;
  const lessonProgress = totalLessons > 0 ? (currentLesson / totalLessons) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2540] text-white flex flex-col fixed h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00D084] to-[#00B872] rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CodeBuddy AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            type="button"
            onClick={() => setActiveTab("overview")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00D084] text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Головна</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("courses")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Курси</span>
          </button>
          <button 
            type="button"
            onClick={() => onNavigate('editor')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <Code2 className="w-5 h-5" />
            <span className="font-medium">Code Editor</span>
          </button>
          <button 
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Челенджі</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Налаштування</span>
          </button>
          <button 
            type="button"
            onClick={() => {
              logout();
              onNavigate('landing');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-white/80 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Вийти</span>
          </button>
          <button 
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 mt-2"
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#00D084] text-white font-semibold">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">{userName}</div>
              <div className="text-xs text-white/60">Рівень {currentLevel}</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="mb-2">Привіт, {userName}! 👋</h1>
              <p className="text-gray-600 text-lg">Ти на вірному шляху! Продовжуй в тому ж дусі.</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-gray-200 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Рівень</p>
                  <p className="text-3xl font-bold text-[#0A2540]">{currentLevel}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Досвід (XP)</p>
                  <p className="text-3xl font-bold text-[#0A2540]">{currentXP}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#00D084] to-[#00B872] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Днів поспіль</p>
                  <p className="text-3xl font-bold text-[#0A2540]">{streak}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 rounded-2xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ачівки</p>
                  <p className="text-3xl font-bold text-[#0A2540]">12</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border-2 border-gray-200 rounded-xl p-1">
            <TabsTrigger value="overview" className="rounded-lg">Огляд</TabsTrigger>
            <TabsTrigger value="courses" className="rounded-lg">Курси</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Large Cards */}
              <div className="lg:col-span-2 space-y-6">
            {/* Learning Plan Widget */}
            <Card className="border-2 border-gray-200 rounded-2xl bg-white overflow-hidden">
              <div className="bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">Твій План Навчання</h3>
                  <Badge className="bg-[#00D084] text-white hover:bg-[#00B872]">
                    В процесі
                  </Badge>
                </div>
                <p className="text-white/80 mb-6">{currentModule}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Урок {currentLesson} з {totalLessons}</span>
                    <span className="text-sm text-white/80">{lessonProgress}%</span>
                  </div>
                  <Progress value={lessonProgress} className="h-2 bg-white/20" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#F7F9FC] rounded-xl">
                    <div className="w-10 h-10 bg-[#00D084] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#0A2540] mb-1">Наступний урок</h4>
                      <p className="text-sm text-gray-600 mb-3">Функції та параметри в Python</p>
                      {selectedCourse ? (
                        <Button 
                          type="button"
                          onClick={() => onNavigate('editor')}
                          className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl"
                        >
                          Продовжити навчання
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      ) : (
                        <Button 
                          type="button"
                          onClick={() => setActiveTab("courses")}
                          className="bg-[#0A2540] text-white hover:bg-[#1E3A5F] rounded-xl"
                        >
                          Виберіть курс
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                    {[
                      { label: "Завершено", value: "2/10", color: "text-[#00D084]" },
                      { label: "Тривалість", value: "~4 год", color: "text-[#0A2540]" },
                      { label: "Складність", value: "Базова", color: "text-[#FFA500]" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="border-2 border-[#FFA500] rounded-2xl bg-white overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-[#FFA500]/10 to-[#FF8C00]/10 border-b border-[#FFA500]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#0A2540]">Щоденний Челендж</CardTitle>
                      <CardDescription className="text-gray-600">Заробляй +50 XP</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>23:45:12</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h4 className="font-semibold text-[#0A2540] mb-2">Написати функцію reverse_string()</h4>
                <p className="text-gray-600 mb-4">
                  Створи функцію, яка приймає рядок і повертає його у зворотному порядку без використання вбудованих методів.
                </p>
                <div className="flex gap-3">
                  <Button 
                    type="button"
                    onClick={() => onNavigate('editor')}
                    className="flex-1 bg-[#FFA500] text-white hover:bg-[#FF8C00] rounded-xl"
                  >
                    Розпочати челендж
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="border-2 border-gray-300 rounded-xl"
                  >
                    Підказка
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Smaller Cards */}
          <div className="space-y-6">
            {/* Progress Widget */}
            <Card className="border-2 border-gray-200 rounded-2xl bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-[#0A2540] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00D084]" />
                  Твій Прогрес
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">До наступного рівня</span>
                      <span className="text-sm font-semibold text-[#0A2540]">
                        {currentXP}/{nextLevelXP} XP
                      </span>
                    </div>
                    <Progress value={(currentXP / nextLevelXP) * 100} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Рівень</span>
                      <Badge variant="outline" className="border-[#0A2540] text-[#0A2540]">
                        {currentLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Бали (XP)</span>
                      <span className="font-semibold text-[#0A2540]">{currentXP}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Днів поспіль</span>
                      <span className="flex items-center gap-1 font-semibold text-[#FFA500]">
                        <Flame className="w-4 h-4" />
                        {streak} днів
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Widget */}
            <Card className="border-2 border-gray-200 rounded-2xl bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-[#0A2540] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#8B5CF6]" />
                  Останні Ачівки
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    {
                      name: "Перший код",
                      description: "Написав свою першу програму",
                      icon: "🎯",
                      color: "from-[#00D084] to-[#00B872]"
                    },
                    {
                      name: "Streak Master",
                      description: "5 днів навчання поспіль",
                      icon: "🔥",
                      color: "from-[#FFA500] to-[#FF8C00]"
                    },
                    {
                      name: "Bug Hunter",
                      description: "Виправив 10 помилок",
                      icon: "🐛",
                      color: "from-[#8B5CF6] to-[#7C3AED]"
                    }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[#F7F9FC] rounded-xl hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#0A2540] text-sm truncate">{achievement.name}</h4>
                        <p className="text-xs text-gray-600 truncate">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-gray-200 rounded-2xl bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-[#0A2540]">Швидкі дії</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button 
                    type="button"
                    onClick={() => onNavigate('editor')}
                    variant="outline" 
                    className="w-full justify-start border-2 border-gray-200 hover:bg-[#F7F9FC] rounded-xl"
                  >
                    <Code2 className="w-4 h-4 mr-2 text-[#00D084]" />
                    Відкрити Code Editor
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-start border-2 border-gray-200 hover:bg-[#F7F9FC] rounded-xl"
                  >
                    <BookOpen className="w-4 h-4 mr-2 text-[#0A2540]" />
                    Переглянути матеріали
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-start border-2 border-gray-200 hover:bg-[#F7F9FC] rounded-xl"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-[#FFA500]" />
                    Запланувати сесію
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="courses" className="space-y-6">
        <CourseSelection />
      </TabsContent>
    </Tabs>
      </main>
    </div>
  );
}
