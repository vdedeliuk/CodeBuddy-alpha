import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useApp } from "../context/AppContext";
import { Code2, Play, CheckCircle2, Clock, TrendingUp } from "lucide-react";

export function CourseSelection() {
  const { courses, selectedCourse, selectCourse } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0A2540] mb-2">Виберіть курс</h2>
        <p className="text-gray-600">Обери курс для навчання або продовж наявний</p>
      </div>

      {selectedCourse && (
        <Card className="border-2 border-[#00D084] bg-gradient-to-br from-[#00D084]/5 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#0A2540]">Поточний курс</CardTitle>
                <CardDescription>{selectedCourse.description}</CardDescription>
              </div>
              <Badge className="bg-[#00D084] text-white">Активний</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Прогрес</span>
                  <span className="text-sm font-semibold text-[#0A2540]">
                    {selectedCourse.progress}%
                  </span>
                </div>
                <Progress value={selectedCourse.progress} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Урок</p>
                  <p className="text-lg font-bold text-[#0A2540]">
                    {selectedCourse.currentLesson}/{selectedCourse.lessons}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Тривалість</p>
                  <p className="text-lg font-bold text-[#0A2540]">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Складність</p>
                  <Badge variant="outline" className="border-[#FFA500] text-[#FFA500]">
                    {selectedCourse.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const isSelected = selectedCourse?.id === course.id;
          const isStarted = course.progress > 0;

          return (
            <Card
              key={course.id}
              className={`border-2 rounded-2xl hover:shadow-xl transition-all ${
                isSelected
                  ? "border-[#00D084] bg-gradient-to-br from-[#00D084]/5 to-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A2540] to-[#00D084] rounded-xl flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[#0A2540]">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="border-[#0A2540] text-[#0A2540]">
                    {course.language}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${
                      course.difficulty === "Базова"
                        ? "border-[#00D084] text-[#00D084]"
                        : course.difficulty === "Середня"
                        ? "border-[#FFA500] text-[#FFA500]"
                        : "border-[#8B5CF6] text-[#8B5CF6]"
                    }`}
                  >
                    {course.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isStarted && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Прогрес</span>
                        <span className="text-sm font-semibold text-[#0A2540]">
                          {course.progress}%
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Play className="w-4 h-4" />
                      <span>{course.lessons} уроків</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => selectCourse(course.id)}
                    className={`w-full rounded-xl ${
                      isSelected
                        ? "bg-[#00D084] text-white hover:bg-[#00B872]"
                        : "bg-[#0A2540] text-white hover:bg-[#1E3A5F]"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Продовжити навчання
                      </>
                    ) : isStarted ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Продовжити курс
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Почати курс
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

