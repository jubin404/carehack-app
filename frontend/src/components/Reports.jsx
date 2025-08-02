import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { 
  FileText, 
  Download, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Calendar,
  Search,
  MoreVertical
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const mockStudentReports = [
  {
    id: 1,
    studentName: 'Emma Johnson',
    age: 8,
    class: '3A',
    overallHealth: 'healthy',
    lastAssessment: '2025-07-20',
    completedTests: 3,
    pendingTests: 1,
    riskLevel: 'low',
    visionStatus: 'Normal',
    behavioralScore: 85,
    parentContact: 'jane.johnson@email.com'
  },
  {
    id: 2,
    studentName: 'Liam Smith',
    age: 12,
    class: '7B',
    overallHealth: 'needs-attention',
    lastAssessment: '2025-07-15',
    completedTests: 2,
    pendingTests: 2,
    riskLevel: 'medium',
    visionStatus: 'Requires Follow-up',
    behavioralScore: 68,
    parentContact: 'mark.smith@email.com'
  },
  {
    id: 3,
    studentName: 'Sophia Davis',
    age: 10,
    class: '5C',
    overallHealth: 'healthy',
    lastAssessment: '2025-07-18',
    completedTests: 4,
    pendingTests: 0,
    riskLevel: 'low',
    visionStatus: 'Normal',
    behavioralScore: 92,
    parentContact: 'sarah.davis@email.com'
  },
  {
    id: 4,
    studentName: 'Noah Wilson',
    age: 9,
    class: '4A',
    overallHealth: 'needs-attention',
    lastAssessment: '2025-07-12',
    completedTests: 1,
    pendingTests: 3,
    riskLevel: 'high',
    visionStatus: 'Urgent Review',
    behavioralScore: 45,
    parentContact: 'michael.wilson@email.com'
  },
  {
    id: 5,
    studentName: 'Olivia Brown',
    age: 7,
    class: '2B',
    overallHealth: 'healthy',
    lastAssessment: '2025-07-22',
    completedTests: 2,
    pendingTests: 1,
    riskLevel: 'low',
    visionStatus: 'Normal',
    behavioralScore: 88,
    parentContact: 'lisa.brown@email.com'
  },
  {
    id: 6,
    studentName: 'Mason Garcia',
    age: 11,
    class: '6A',
    overallHealth: 'healthy',
    lastAssessment: '2025-07-19',
    completedTests: 3,
    pendingTests: 1,
    riskLevel: 'low',
    visionStatus: 'Normal',
    behavioralScore: 79,
    parentContact: 'carlos.garcia@email.com'
  }
];

const aggregateData = {
  totalStudents: 156,
  healthyStudents: 128,
  studentsNeedingAttention: 28,
  completedAssessments: 342,
  pendingAssessments: 89,
  averageScore: 78.5
};

const classPerformanceData = [
  { class: '1A', avgScore: 82, students: 25 },
  { class: '2A', avgScore: 78, students: 28 },
  { class: '3A', avgScore: 85, students: 26 },
  { class: '4A', avgScore: 73, students: 24 },
  { class: '5A', avgScore: 79, students: 27 },
  { class: '6A', avgScore: 81, students: 26 }
];

const monthlyTrendsData = [
  { month: 'Jan', assessments: 45, avgScore: 76 },
  { month: 'Feb', assessments: 52, avgScore: 78 },
  { month: 'Mar', assessments: 48, avgScore: 75 },
  { month: 'Apr', avgScore: 79, assessments: 56 },
  { month: 'May', assessments: 61, avgScore: 81 },
  { month: 'Jun', assessments: 58, avgScore: 79 },
  { month: 'Jul', assessments: 62, avgScore: 82 }
];

const riskDistributionData = [
  { name: 'Low Risk', value: 112, color: '#10b981' },
  { name: 'Medium Risk', value: 32, color: '#f59e0b' },
  { name: 'High Risk', value: 12, color: '#ef4444' }
];

export function Reports() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getRiskBadgeVariant = (risk) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthBadgeVariant = (health) => {
    return health === 'healthy' ? 'default' : 'destructive';
  };

  const filteredReports = mockStudentReports.filter(report => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'healthy' && report.overallHealth === 'healthy') ||
      (activeFilter === 'needs-attention' && report.overallHealth === 'needs-attention') ||
      (activeFilter === 'high-risk' && report.riskLevel === 'high');
    
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Student Health Reports</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive overview of all student health assessments and reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{aggregateData.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy Students</p>
                <p className="text-2xl font-bold text-green-600">{aggregateData.healthyStudents}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  82% of total
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Attention</p>
                <p className="text-2xl font-bold text-orange-600">{aggregateData.studentsNeedingAttention}</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  18% of total
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{aggregateData.averageScore}%</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.5% this month
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Individual Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgScore" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessment Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { student: 'Emma Johnson', assessment: 'Color Vision Test', status: 'completed', date: '2025-07-20' },
                  { student: 'Liam Smith', assessment: 'ADHD Screening', status: 'completed', date: '2025-07-19' },
                  { student: 'Sophia Davis', assessment: 'Visual Acuity Test', status: 'completed', date: '2025-07-18' },
                  { student: 'Noah Wilson', assessment: 'Behavioral Assessment', status: 'pending', date: '2025-07-17' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium">{activity.student}</p>
                        <p className="text-sm text-muted-foreground">{activity.assessment}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search students or classes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'healthy', 'needs-attention', 'high-risk'].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              ))}
            </div>
          </div>

          {/* Student Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Individual Student Reports</CardTitle>
              <p className="text-sm text-muted-foreground">
                Showing {filteredReports.length} of {mockStudentReports.length} students
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Health Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Last Assessment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.studentName}</p>
                          <p className="text-sm text-muted-foreground">Age: {report.age}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.class}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getHealthBadgeVariant(report.overallHealth)}>
                          {report.overallHealth === 'healthy' ? 'Healthy' : 'Needs Attention'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskBadgeVariant(report.riskLevel)}>
                          {report.riskLevel.charAt(0).toUpperCase() + report.riskLevel.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="text-green-600">{report.completedTests} completed</span>
                          {report.pendingTests > 0 && (
                            <span className="text-orange-600 block">{report.pendingTests} pending</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{report.behavioralScore}%</span>
                          <Progress value={report.behavioralScore} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>{report.lastAssessment}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Assessment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="assessments" stroke="#3b82f6" strokeWidth={2} name="Assessments" />
                  <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#10b981" strokeWidth={2} name="Avg Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance by Age Group */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Age Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { ageGroup: '6-8 years', avgScore: 82, students: 45 },
                    { ageGroup: '9-11 years', avgScore: 78, students: 67 },
                    { ageGroup: '12-14 years', avgScore: 75, students: 44 }
                  ].map((group, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{group.ageGroup} ({group.students} students)</span>
                        <span className="font-medium">{group.avgScore}%</span>
                      </div>
                      <Progress value={group.avgScore} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Completion Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Completion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { assessment: 'Vision Screening', completed: 89, total: 95 },
                    { assessment: 'ADHD Assessment', completed: 67, total: 89 },
                    { assessment: 'Color Vision Test', completed: 78, total: 82 },
                    { assessment: 'Behavioral Screening', completed: 45, total: 67 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.assessment}</span>
                        <span className="font-medium">{item.completed}/{item.total} ({Math.round((item.completed/item.total)*100)}%)</span>
                      </div>
                      <Progress value={(item.completed/item.total)*100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}