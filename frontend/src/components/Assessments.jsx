import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, CheckCircle, Clock, AlertCircle, Brain, Target, BookOpen } from 'lucide-react';

const assessmentTypes = [
  {
    id: 'motor',
    name: 'Motor Skills Assessment',
    description: 'Evaluate fine and gross motor development',
    ageRange: '2-18 years',
    duration: '30-45 minutes',
    icon: Target
  },
  {
    id: 'cognitive',
    name: 'Cognitive Development',
    description: 'Assess problem-solving and reasoning abilities',
    ageRange: '3-18 years',
    duration: '45-60 minutes',
    icon: Brain
  },
  {
    id: 'language',
    name: 'Language & Communication',
    description: 'Evaluate speech and language development',
    ageRange: '1-18 years',
    duration: '20-40 minutes',
    icon: BookOpen
  },
  {
    id: 'social',
    name: 'Social & Emotional',
    description: 'Assess social interaction and emotional regulation',
    ageRange: '2-18 years',
    duration: '30-50 minutes',
    icon: CheckCircle
  }
];

const mockAssessments = [
  {
    id: 1,
    child: 'Emma Johnson',
    type: 'Motor Skills Assessment',
    date: '2025-07-01',
    status: 'completed',
    score: 85,
    assessor: 'Dr. Sarah Wilson',
    nextDue: '2026-01-01'
  },
  {
    id: 2,
    child: 'Liam Smith',
    type: 'Cognitive Development',
    date: '2025-06-15',
    status: 'completed',
    score: 78,
    assessor: 'Dr. Michael Brown',
    nextDue: '2025-12-15'
  },
  {
    id: 3,
    child: 'Emma Johnson',
    type: 'Language & Communication',
    date: '2025-08-10',
    status: 'scheduled',
    score: null,
    assessor: 'Dr. Lisa Chen',
    nextDue: null
  }
];

export function Assessments() {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>Assessments & Screening</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              <SelectItem value="emma">Emma Johnson</SelectItem>
              <SelectItem value="liam">Liam Smith</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Assessment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Screenings</TabsTrigger>
          <TabsTrigger value="history">Assessment History</TabsTrigger>
          <TabsTrigger value="results">Detailed Results</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessmentTypes.map((assessment) => {
              const Icon = assessment.icon;
              return (
                <Card key={assessment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{assessment.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{assessment.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Age Range</p>
                        <p>{assessment.ageRange}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p>{assessment.duration}</p>
                      </div>
                    </div>
                    <Button className="w-full">Schedule Assessment</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {mockAssessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{assessment.type}</h3>
                        <p className="text-sm text-muted-foreground">{assessment.child}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {assessment.date}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Assessor: {assessment.assessor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      {getStatusBadge(assessment.status)}
                      {assessment.score && (
                        <div>
                          <p className="text-xs text-muted-foreground">Score</p>
                          <p className={`text-lg font-bold ${getScoreColor(assessment.score)}`}>
                            {assessment.score}%
                          </p>
                        </div>
                      )}
                      {assessment.nextDue && (
                        <p className="text-xs text-muted-foreground">
                          Next Due: {assessment.nextDue}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emma Johnson - Latest Assessment</CardTitle>
                <p className="text-sm text-muted-foreground">Motor Skills Assessment - July 1, 2025</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Fine Motor Skills</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Gross Motor Skills</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Balance & Coordination</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Recommendations</h4>
                  <p className="text-xs text-muted-foreground">
                    Continue current physical activities. Consider introducing more fine motor skill exercises like drawing and crafts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liam Smith - Latest Assessment</CardTitle>
                <p className="text-sm text-muted-foreground">Cognitive Development - June 15, 2025</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Problem Solving</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Memory & Attention</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Processing Speed</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                    <h4 className="font-medium text-sm">Areas for Improvement</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Focus on attention-building activities and memory games. Consider follow-up in 3 months.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}