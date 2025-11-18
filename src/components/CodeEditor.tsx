import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Play, 
  ArrowLeft, 
  FolderTree, 
  FileCode,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Send,
  Zap,
  Code2,
  Terminal,
  Settings,
  Loader2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

interface CodeEditorProps {
  onNavigate: (page: string) => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function CodeEditor({ onNavigate }: CodeEditorProps) {
  const { selectedCourse, updateUserProgress } = useApp();
  const [code, setCode] = useState(`def calculate_sum(a, b):
    """Функція для обчислення суми двох чисел"""
    result = a + b
    return result

def divide_numbers(x, y):
    """Функція для ділення чисел"""
    # Помилка: не перевіряємо ділення на нуль
    return x / y

# Виклик функцій
sum_result = calculate_sum(10, 5)
print(f"Сума: {sum_result}")

# Тут буде помилка!
division_result = divide_numbers(10, 0)
print(f"Результат ділення: {division_result})`);
  
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Привіт! Я твій AI-ментор. Можу пояснити будь-який код або допомогти з помилками. Що тебе цікавить?"
    }
  ]);
  const [hasError, setHasError] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Симуляція структури файлів
  const fileTree = [
    { name: "src", type: "folder", children: [
      { name: "main.py", type: "file", active: true },
      { name: "utils.py", type: "file", active: false },
    ]},
    { name: "tests", type: "folder", children: [
      { name: "test_main.py", type: "file", active: false },
    ]},
    { name: "README.md", type: "file", active: false },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    // Автоматичне визначення помилок в коді
    const errorPatterns = [
      /division_result = divide_numbers\(10, 0\)/,
      /return x \/ y/,
    ];
    const hasErrorInCode = errorPatterns.some(pattern => pattern.test(code));
    setHasError(hasErrorInCode);
  }, [code]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setTerminalOutput("> python main.py\n");
    
    // Симуляція виконання коду
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (hasError) {
      setTerminalOutput(`> python main.py
Сума: 15
Traceback (most recent call last):
  File "main.py", line 14, in <module>
    division_result = divide_numbers(10, 0)
  File "main.py", line 9, in divide_numbers
    return x / y
ZeroDivisionError: division by zero`);
    } else {
      setTerminalOutput(`> python main.py
Сума: 15
Результат ділення: 2.0
✓ Програма виконана успішно`);
      updateUserProgress(10);
    }
    
    setIsRunning(false);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || isChatLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: chatMessage,
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage("");
    setIsChatLoading(true);

    // Симуляція відповіді AI
    await new Promise(resolve => setTimeout(resolve, 1500));

    let aiResponse = "";
    const lowerMessage = userMessage.content.toLowerCase();

    if (lowerMessage.includes("рекурсія") || lowerMessage.includes("рекурс")) {
      aiResponse = "Рекурсія - це техніка, коли функція викликає сама себе. Наприклад:\n\n```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n```\n\nВажливо мати базовий випадок (умову виходу), інакше функція викликатиметься нескінченно.";
    } else if (lowerMessage.includes("list") && lowerMessage.includes("tuple")) {
      aiResponse = "**List (список)** - змінюваний (mutable) тип даних:\n```python\nmy_list = [1, 2, 3]\nmy_list.append(4)  # Можна змінювати\n```\n\n**Tuple (кортеж)** - незмінюваний (immutable) тип даних:\n```python\nmy_tuple = (1, 2, 3)\n# my_tuple.append(4)  # Помилка! Не можна змінювати\n```\n\nСписки використовують квадратні дужки [], кортежі - круглі ().";
    } else if (lowerMessage.includes("декоратор")) {
      aiResponse = "Декоратор - це функція, яка приймає іншу функцію і розширює її поведінку. Приклад:\n\n```python\ndef my_decorator(func):\n    def wrapper():\n        print('До виклику функції')\n        func()\n        print('Після виклику функції')\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print('Привіт!')\n```\n\nДекоратори корисні для додавання логіки (логірування, перевірки, кешування) без зміни оригінального коду.";
    } else if (lowerMessage.includes("помилка") || lowerMessage.includes("error")) {
      aiResponse = "Бачу, що в твоєму коді є помилка ділення на нуль. Проблема в функції `divide_numbers()` - вона не перевіряє, чи дільник не дорівнює нулю.\n\n**Рішення:**\n```python\ndef divide_numbers(x, y):\n    if y == 0:\n        return \"Помилка: ділення на нуль\"\n    return x / y\n```\n\nЦе називається валідація вхідних даних - важлива практика в програмуванні!";
    } else {
      aiResponse = "Це цікаве питання! Дозволь мені пояснити:\n\n" + userMessage.content + "\n\nЯкщо хочеш, можу надати більш детальне пояснення або приклади коду. Просто запитай!";
    }

    setChatHistory(prev => [...prev, { role: "assistant", content: aiResponse }]);
    setIsChatLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <Button 
            type="button"
            onClick={() => onNavigate('dashboard')}
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-[#0A2540]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад до Dashboard
          </Button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#0A2540]" />
            <span className="font-medium text-[#0A2540]" style={{ fontFamily: 'var(--font-code)' }}>main.py</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-[#00D084] text-[#00D084]">
            Python 3.11
          </Badge>
          <Button 
            type="button"
            onClick={handleRunCode}
            disabled={isRunning}
            className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl shadow-lg shadow-[#00D084]/30"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Виконання...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Запустити код
              </>
            )}
          </Button>
          <Button 
            type="button"
            variant="ghost" 
            size="icon"
            className="text-gray-600 hover:text-[#0A2540]"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex pt-14">
        <div className="flex-1 flex">
          {/* File Explorer */}
          <div className="w-64 bg-[#F7F9FC] border-r border-gray-200 flex-shrink-0">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-[#0A2540]" />
              <span className="font-medium text-[#0A2540]">Провідник</span>
            </div>
            <div className="p-2">
              {fileTree.map((item, index) => (
                <div key={index} className="mb-1">
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 font-medium">
                    <span className="text-xs">▼</span>
                    <span>{item.name}</span>
                  </div>
                  {item.type === "folder" && item.children && (
                    <div className="ml-4">
                      {item.children.map((child: any, childIndex: number) => (
                        <div 
                          key={childIndex}
                          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer ${
                            child.active 
                              ? 'bg-[#00D084]/10 text-[#00D084] font-medium' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <FileCode className="w-3 h-3" />
                          <span style={{ fontFamily: 'var(--font-code)' }}>{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.type === "file" && (
                    <div className={`flex items-center gap-2 px-3 py-2 ml-4 text-sm rounded-lg cursor-pointer ${
                      item.active 
                        ? 'bg-[#00D084]/10 text-[#00D084] font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                      <FileCode className="w-3 h-3" />
                      <span style={{ fontFamily: 'var(--font-code)' }}>{item.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor and Terminal */}
          <div className="flex-1 flex flex-col">
            {/* Code Editor */}
            <div className="flex-1 bg-[#1E1E1E] p-6 overflow-auto" style={{ height: '60%' }}>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-[#D4D4D4] text-sm font-mono resize-none outline-none"
                style={{ 
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
                  tabSize: 2,
                }}
                spellCheck={false}
              />
            </div>

            {/* Terminal Output */}
            <div className="bg-[#0A2540] flex flex-col" style={{ height: '40%' }}>
              <div className="px-4 py-2 bg-[#0A2540]/90 border-b border-white/10 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Вивід програми</span>
              </div>
              <div className="overflow-auto h-[calc(100%-2.5rem)]">
                <div className="p-4 text-sm font-mono whitespace-pre-wrap">
                  {terminalOutput || (
                    <div className="text-gray-500">
                      Натисни "Запустити код" щоб виконати програму
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant Panel */}
          <div className="w-96 flex-shrink-0 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A2540] to-[#00D084] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[#0A2540]">CodeBuddy AI</span>
            </div>

            <Tabs defaultValue="debug" className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none border-b border-gray-200 bg-transparent p-0">
                <TabsTrigger 
                  value="debug" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00D084] data-[state=active]:bg-transparent"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Дебагер
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00D084] data-[state=active]:bg-transparent"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  Чат-Ментор
                </TabsTrigger>
              </TabsList>

              <TabsContent value="debug" className="flex-1 overflow-auto p-0 m-0">
                <div className="p-6 space-y-4">
                  {hasError ? (
                    <>
                      {/* Error Analysis */}
                      <Card className="border-2 border-[#FFA500] bg-[#FFA500]/5 overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-xl flex items-center justify-center flex-shrink-0">
                              <AlertCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-[#FFA500] text-base">Помилка в рядку 9</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">ZeroDivisionError</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700 mb-3">
                            Ти намагаєшся поділити число на нуль у функції <code className="bg-white px-1.5 py-0.5 rounded text-[#FFA500]" style={{ fontFamily: 'var(--font-code)' }}>divide_numbers()</code>. 
                            Це завжди призводить до помилки.
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-[#FFA500]/30">
                            <p className="text-xs text-gray-600 mb-1">Проблемний код:</p>
                            <pre className="text-xs text-gray-800" style={{ fontFamily: 'var(--font-code)' }}>
                              <code>return x / y  # y = 0</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Solution */}
                      <Card className="border-2 border-[#00D084] bg-[#00D084]/5 overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#00D084] to-[#00B872] rounded-xl flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-[#00D084] text-base">Рішення</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">Додай перевірку на нуль</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700 mb-3">
                            Завжди перевіряй, чи дільник не дорівнює нулю перед діленням:
                          </p>
                          <div className="bg-white p-3 rounded-lg border border-[#00D084]/30 mb-3">
                            <pre className="text-xs text-gray-800" style={{ fontFamily: 'var(--font-code)' }}>
{`def divide_numbers(x, y):
    if y == 0:
        return "Помилка: ділення на нуль"
    return x / y`}
                            </pre>
                          </div>
                          <Button 
                            type="button"
                            className="w-full bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl"
                            size="sm"
                          >
                            Прийняти виправлення
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Learning Tip */}
                      <Card className="border-2 border-gray-200 bg-white">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-[#0A2540] text-base flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#0A2540]" />
                            Порада від AI
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700">
                            Завжди валідуй вхідні дані функцій! Це допоможе уникнути багатьох помилок. 
                            Прочитай більше про <a href="#" className="text-[#00D084] hover:underline">обробку виключень в Python</a>.
                          </p>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card className="border-2 border-[#00D084] bg-[#00D084]/5">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#00D084] to-[#00B872] rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-[#00D084] mb-2">Все чудово!</h3>
                        <p className="text-sm text-gray-600">
                          Твій код працює без помилок. Продовжуй у тому ж дусі! 🎉
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                <div className="flex-1 overflow-auto">
                  <div className="p-6 space-y-4">
                    {chatHistory.map((message, index) => (
                      <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'assistant' 
                            ? 'bg-gradient-to-br from-[#0A2540] to-[#00D084]' 
                            : 'bg-gray-300'
                        }`}>
                          {message.role === 'assistant' ? (
                            <Sparkles className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-xs text-white font-semibold">U</span>
                          )}
                        </div>
                        <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block p-4 rounded-2xl max-w-[85%] ${
                            message.role === 'assistant'
                              ? 'bg-[#F7F9FC] text-gray-800'
                              : 'bg-[#0A2540] text-white'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isChatLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#0A2540] to-[#00D084]">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-[#F7F9FC] p-4 rounded-2xl">
                          <Loader2 className="w-4 h-4 animate-spin text-[#00D084]" />
                        </div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                    
                    {/* Sample Questions */}
                    {chatHistory.length <= 1 && (
                      <div className="pt-4">
                        <p className="text-xs text-gray-500 mb-3">Приклади питань:</p>
                        <div className="space-y-2">
                          {[
                            "Що таке рекурсія?",
                            "Поясни різницю між list і tuple",
                            "Як працює декоратор в Python?"
                          ].map((question, index) => (
                            <Button
                              key={index}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setChatMessage(question);
                                setTimeout(() => handleSendMessage(), 100);
                              }}
                              className="w-full justify-start text-left h-auto py-2 px-3 text-xs border-2 border-gray-200 hover:border-[#00D084] hover:text-[#00D084] rounded-xl"
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex gap-2">
                    <textarea
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Запитай щось у AI-ментора..."
                      className="flex-1 border-2 border-gray-200 focus:border-[#00D084] rounded-xl p-2 resize-none min-h-[40px] max-h-[120px]"
                      rows={1}
                    />
                    <Button 
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!chatMessage.trim() || isChatLoading}
                      size="icon"
                      className="bg-[#00D084] text-white hover:bg-[#00B872] rounded-xl flex-shrink-0 disabled:opacity-50"
                    >
                      {isChatLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
