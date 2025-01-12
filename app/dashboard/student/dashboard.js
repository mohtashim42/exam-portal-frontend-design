"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Award, Clock } from "lucide-react";

export default function StudentDashboard() {
  const upcomingExams = [
    {
      id: 1,
      title: "Advanced Mathematics",
      date: "2023-06-15",
      time: "10:00 AM",
    },
    { id: 2, title: "Organic Chemistry", date: "2023-06-18", time: "2:00 PM" },
    {
      id: 3,
      title: "Digital Electronics",
      date: "2023-06-20",
      time: "9:00 AM",
    },
  ];

  return (
    <DashboardLayout userRole="Student">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Enrolled
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 new this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Exams
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next exam in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                >
                  <div>
                    <h3 className="font-semibold">{exam.title}</h3>
                    <p className="text-sm text-gray-500">
                      {exam.date} at {exam.time}
                    </p>
                  </div>
                  <Button variant="outline">Prepare</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
