import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Switch } from "./ui/switch";
import { Check, Code2, Target, BookOpen, TrendingUp, Sparkles, Zap, Award, Users, Play, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { AuthDialog } from "./AuthDialog";
import { useApp } from "../context/AppContext";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const { isAuthenticated } = useApp();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0A2540] to-[#00D084] rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#0A2540]">CodeBuddy AI</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#pricing" className="text-gray-600 hover:text-[#0A2540] transition-colors">Тарифи</a>
              <a href="#blog" className="text-gray-600 hover:text-[#0A2540] transition-colors">Блог</a>
              <a href="#about" className="text-gray-600 hover:text-[#0A2540] transition-colors">Про нас</a>
              {isAuthenticated ? (
                <Button 
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl px-6 shadow-lg shadow-[#00D084]/30"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    type="button"
                    variant="ghost"
                    onClick={(e) => {
                      console.log("Вхід кнопка натиснута");
                      e.preventDefault();
                      e.stopPropagation();
                      // Використовуємо setTimeout щоб уникнути конфлікту з подією кліку
                      setTimeout(() => {
                        setAuthTab("login");
                        setAuthDialogOpen(true);
                        console.log("authDialogOpen встановлено в:", true);
                      }, 0);
                    }}
                    style={{ pointerEvents: 'auto', zIndex: 10, position: 'relative' }}
                    className="text-gray-600 hover:text-[#0A2540] cursor-pointer"
                  >
                    Вхід
                  </Button>
                  <Button 
                    type="button"
                    onClick={(e) => {
                      console.log("Почати безкоштовно кнопка натиснута");
                      e.preventDefault();
                      e.stopPropagation();
                      // Використовуємо setTimeout щоб уникнути конфлікту з подією кліку
                      setTimeout(() => {
                        setAuthTab("register");
                        setAuthDialogOpen(true);
                        console.log("authDialogOpen встановлено в:", true);
                      }, 0);
                    }}
                    style={{ pointerEvents: 'auto', zIndex: 10, position: 'relative' }}
                    className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl px-6 shadow-lg shadow-[#00D084]/30 cursor-pointer"
                  >
                    Почати безкоштовно
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F7F9FC] to-white py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00D084]/10 text-[#00D084] px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-powered навчання</span>
              </div>
              <h1 className="mb-6">
                Твій персональний AI-ментор для старту в ІТ
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Перестань вгадувати. Почни кодувати з AI, який пояснює кожну помилку простою мовою.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isAuthenticated) {
                      onNavigate('dashboard');
                    } else {
                      setAuthTab("register");
                      setAuthDialogOpen(true);
                    }
                  }}
                  size="lg" 
                  className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl px-8 shadow-lg shadow-[#00D084]/30 text-lg h-14"
                >
                  Почати безкоштовно
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  type="button"
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white rounded-xl px-8 text-lg h-14"
                >
                  Дивитись демо
                  <Play className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00D084]" />
                  <span>Без кредитної картки</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00D084]" />
                  <span>7 днів безкоштовно</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D084]/20 to-[#0A2540]/20 rounded-3xl blur-3xl"></div>
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1742767069929-0c663150b164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHJvYm90JTIwbWVudG9yJTIwY29kaW5nfGVufDF8fHx8MTc2MzMxOTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Mentor"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4">Спробуй наш AI-дебагер прямо зараз</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Вставте код з помилкою та отримайте миттєве пояснення
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Code Editor */}
                <div className="bg-[#1E1E1E] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-sm ml-4" style={{ fontFamily: 'var(--font-code)' }}>main.py</span>
                  </div>
                  <pre className="text-gray-300 text-sm overflow-x-auto" style={{ fontFamily: 'var(--font-code)' }}>
{`def calculate_average(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total / len(numbers)

# Помилка буде тут
result = calculate_average("12345")
print(result)`}
                  </pre>
                </div>

                {/* AI Analysis */}
                <div className="bg-[#F7F9FC] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#00D084]" />
                    <h3 className="text-[#0A2540]">Аналіз від CodeBuddy AI</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-[#FFA500]/10 border-l-4 border-[#FFA500] p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Zap className="w-5 h-5 text-[#FFA500] flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-medium text-[#FFA500] mb-1">Помилка в рядку 8: TypeError</p>
                          <p className="text-sm text-gray-700">
                            Ти передаєш рядок "12345" замість списку чисел у функцію <code className="bg-white px-1 rounded" style={{ fontFamily: 'var(--font-code)' }}>calculate_average()</code>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#00D084]/10 border-l-4 border-[#00D084] p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#00D084] flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-medium text-[#00D084] mb-1">Рішення</p>
                          <p className="text-sm text-gray-700 mb-2">
                            Передай список чисел замість рядка:
                          </p>
                          <code className="block bg-white p-2 rounded text-sm" style={{ fontFamily: 'var(--font-code)' }}>
                            result = calculate_average([1,2,3,4,5])
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNavigate('editor');
                    }}
                    className="w-full mt-6 bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl"
                  >
                    Спробувати в повному редакторі
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Твій шлях від новачка до Junior</h2>
            <p className="text-xl text-gray-600">Чотири простих кроки до кар'єри в ІТ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                icon: Target,
                title: "Тест",
                description: "Визнач свій рівень та мету за 5 хвилин"
              },
              {
                step: "2",
                icon: BookOpen,
                title: "План",
                description: "Отримай персональний план навчання від AI"
              },
              {
                step: "3",
                icon: Code2,
                title: "Кодинг",
                description: "Пиши код в нашому IDE та отримуй фідбек"
              },
              {
                step: "4",
                icon: TrendingUp,
                title: "Прогрес",
                description: "Відслідковуй свій ріст та готуйся до співбесіди"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-2 border-gray-200 rounded-2xl hover:shadow-xl transition-shadow bg-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00D084]/10 to-transparent rounded-bl-full"></div>
                  <CardContent className="p-6 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0A2540] to-[#00D084] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00D084] text-white font-semibold mb-3">
                      {item.step}
                    </div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Створено для тебе</h2>
            <p className="text-xl text-gray-600">Незалежно від твого бекграунду</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Новачки",
                description: "Ти ніколи не програмував? Почни з нуля з нашим AI-ментором, який пояснить кожен крок простою мовою.",
                image: "https://images.unsplash.com/photo-1753613648137-602c669cbe07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NjMzMTk3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
                stats: "З 0 до Junior за 4-6 місяців"
              },
              {
                title: "Світчери",
                description: "Хочеш змінити кар'єру? Отримай структурований план переходу в ІТ з урахуванням твого досвіду.",
                image: "https://images.unsplash.com/photo-1631286434951-caa3dcab4d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBjaGFuZ2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzMxOTcwNHww&ixlib=rb-4.1.0&q=80&w=1080",
                stats: "78% знаходять роботу за півроку"
              },
              {
                title: "Студенти",
                description: "Навчаєшся в університеті? Закріплюй знання на практиці та готуйся до реальних проектів.",
                image: "https://images.unsplash.com/flagged/photo-1579379424253-5aa0a5e1f110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMGNvbXB1dGVyfGVufDF8fHx8MTc2MzMxOTcwNHww&ixlib=rb-4.1.0&q=80&w=1080",
                stats: "95% покращують оцінки"
              }
            ].map((audience, index) => (
              <Card key={index} className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback 
                    src={audience.image}
                    alt={audience.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-[#0A2540]">{audience.title}</CardTitle>
                  <div className="text-sm text-[#00D084] font-medium">{audience.stats}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Що ти отримаєш</h2>
            <p className="text-xl text-gray-600">Все необхідне для успішного старту</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "AI-дебаг",
                description: "Миттєва перевірка коду та пояснення помилок зрозумілою мовою",
                color: "from-[#FFA500] to-[#FF8C00]"
              },
              {
                icon: Target,
                title: "Персональний план",
                description: "Індивідуальна програма навчання, яка адаптується під твій прогрес",
                color: "from-[#00D084] to-[#00B872]"
              },
              {
                icon: Award,
                title: "Гейміфікація",
                description: "Заробляй бейджі, підтримуй мотивацію та відслідковуй свій розвиток",
                color: "from-[#0A2540] to-[#1E3A5F]"
              },
              {
                icon: Code2,
                title: "Проекти",
                description: "Будуй реальні проекти для портфоліо під час навчання",
                color: "from-[#6366F1] to-[#8B5CF6]"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 border-gray-200 rounded-2xl bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Нам довіряють</h2>
            <p className="text-xl text-gray-600">Історії успіху наших студентів</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Олексій Петренко",
                role: "Junior Developer @ Epam",
                quote: "За 3 місяці з нуля до першої роботи в ІТ. AI-ментор допоміг мені зрозуміти складні концепції, які я не міг осягнути самостійно.",
                rating: 5
              },
              {
                name: "Марія Коваль",
                role: "Frontend Developer @ Luxoft",
                quote: "Працювала в маркетингу 5 років. CodeBuddy AI допоміг мені структурувати навчання і за півроку я отримала оффер.",
                rating: 5
              },
              {
                name: "Дмитро Сидоренко",
                role: "Студент КПІ, Freelancer",
                quote: "Університетські знання + практика з AI-ментором = ідеальна комбінація. Зараз вже працюю на фрілансі та будую своє портфоліо.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-200 rounded-2xl bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#FFA500] fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A2540] to-[#00D084] rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#0A2540]">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4">Обери свій план</h2>
            <p className="text-xl text-gray-600 mb-8">Почни безкоштовно, оновлюйся коли готовий</p>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isAnnual ? 'font-semibold text-[#0A2540]' : 'text-gray-600'}`}>Щомісячно</span>
              <Switch 
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-[#00D084]"
              />
              <span className={`text-sm ${isAnnual ? 'font-semibold text-[#0A2540]' : 'text-gray-600'}`}>
                Щорічно 
                <span className="ml-2 inline-block bg-[#00D084] text-white px-2 py-1 rounded-lg text-xs">-20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200 rounded-2xl bg-white">
              <CardHeader className="border-b border-gray-100 p-8">
                <CardTitle className="text-2xl text-[#0A2540]">Freemium</CardTitle>
                <CardDescription className="text-gray-600">Для початку</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-[#0A2540]">0₴</span>
                  <span className="text-gray-600 ml-2">/місяць</span>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    "5 перевірок коду на день",
                    "Базовий AI-дебагер",
                    "Доступ до спільноти",
                    "1 навчальний трек",
                    "Публічні проекти"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00D084] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white rounded-xl h-12"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isAuthenticated) {
                      onNavigate('dashboard');
                    } else {
                      setAuthTab("register");
                      setAuthDialogOpen(true);
                    }
                  }}
                >
                  Почати безкоштовно
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-[#00D084] rounded-2xl bg-white shadow-xl shadow-[#00D084]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#00D084] text-white px-4 py-1 text-sm font-medium">
                Популярний
              </div>
              <CardHeader className="border-b border-gray-100 p-8 bg-gradient-to-br from-[#0A2540]/5 to-[#00D084]/5">
                <CardTitle className="text-2xl text-[#0A2540]">Premium</CardTitle>
                <CardDescription className="text-gray-600">Для серйозного навчання</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-[#0A2540]">
                    {isAnnual ? '239₴' : '299₴'}
                  </span>
                  <span className="text-gray-600 ml-2">/місяць</span>
                  {isAnnual && (
                    <div className="text-sm text-[#00D084] mt-2">
                      Економія 720₴ на рік
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    "Необмежені перевірки коду",
                    "Розширений AI-ментор з GPT-4",
                    "Персональний план навчання",
                    "Всі навчальні треки",
                    "Проектна практика + код-рев'ю",
                    "Пріоритетна підтримка 24/7",
                    "Сертифікати після завершення",
                    "Приватні репозиторії"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00D084] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button 
                  type="button"
                  className="w-full bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl h-12 shadow-lg shadow-[#00D084]/30"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isAuthenticated) {
                      onNavigate('dashboard');
                    } else {
                      setAuthTab("register");
                      setAuthDialogOpen(true);
                    }
                  }}
                >
                  Спробувати 7 днів безкоштовно
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Маєш питання?</h2>
            <p className="text-xl text-gray-600">Відповіді на найпопулярніші запитання</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Чи потрібні мені попередні знання в програмуванні?",
                  answer: "Ні, CodeBuddy AI розроблений для навчання з абсолютного нуля. Наш AI-ментор адаптується під твій рівень і пояснює концепції так, щоб їх міг зрозуміти кожен. Якщо у тебе вже є досвід – платформа також буде корисною для поглиблення знань."
                },
                {
                  question: "Які мови програмування можна вивчити?",
                  answer: "Наразі платформа підтримує JavaScript, Python, Java та C++. Ми постійно додаємо нові мови програмування та технології на основі запитів користувачів. Premium користувачі отримують ранній доступ до нових мов."
                },
                {
                  question: "Чи можу я скасувати підписку в будь-який момент?",
                  answer: "Так, ти можеш скасувати Premium підписку в будь-який момент без додаткових комісій. Доступ до Premium функцій збережеться до кінця оплаченого періоду. Після цього твій акаунт автоматично перейде на Freemium план."
                },
                {
                  question: "Скільки часу потрібно, щоб знайти першу роботу?",
                  answer: "Це залежить від твоєї стартової точки та інтенсивності навчання. В середньому наші користувачі отримують перші оффери через 4-6 місяців активного навчання (15-20 годин на тиждень). З нашим персональним планом та AI-ментором ти можеш прискорити цей процес."
                },
                {
                  question: "Чи надаєте ви допомогу з працевлаштуванням?",
                  answer: "Premium користувачі отримують доступ до Career Hub – секції з порадами щодо створення резюме, підготовки до співбесід та пошуку вакансій. Ми також маємо партнерства з провідними ІТ-компаніями в Україні, які регулярно переглядають портфоліо наших випускників."
                }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-200 bg-white rounded-2xl px-6 data-[state=open]:shadow-lg transition-shadow">
                  <AccordionTrigger className="text-left text-[#0A2540] hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white mb-4">Готовий почати свій шлях в ІТ?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Приєднуйся до тисяч користувачів, які вже навчаються з CodeBuddy AI
          </p>
          <Button 
            type="button"
            size="lg" 
            className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl px-8 shadow-lg shadow-[#00D084]/30 text-lg h-14"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isAuthenticated) {
                onNavigate('dashboard');
              } else {
                setAuthTab("register");
                setAuthDialogOpen(true);
              }
            }}
          >
            Почати безкоштовно
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Auth Dialog */}
      {console.log("LandingPage render - authDialogOpen:", authDialogOpen, "authTab:", authTab)}
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={(open) => {
          console.log("AuthDialog onOpenChange викликано з:", open);
          setAuthDialogOpen(open);
        }}
        defaultTab={authTab}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-[#F7F9FC]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A2540] to-[#00D084] rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-[#0A2540]">CodeBuddy AI</span>
              </div>
              <p className="text-gray-600 text-sm">
                Твій персональний AI-ментор для старту в ІТ
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#0A2540] mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Тарифи</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Функції</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#0A2540] mb-4">Компанія</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Про нас</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Блог</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Контакти</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#0A2540] mb-4">Правові</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Політика конфіденційності</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#0A2540]">Умови використання</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 text-center text-gray-600 text-sm">
            <p>© 2024 CodeBuddy AI. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
