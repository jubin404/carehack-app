import React, { useState,useEffect } from 'react';
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

const API_URL = 'http://localhost:8000/api/students/'; // Replace with your actual API endpoint

export function Reports() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/students/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate health score based on health data
  const calculateHealthScore = (healthData) => {
    if (!healthData || healthData.length === 0) return 0;
    
    const latestHealth = healthData[0]; // Assuming the first is the latest
    let score = 80; // Base score
    
    // Adjust based on BMI
    if (latestHealth.height && latestHealth.weight) {
      const heightInMeters = latestHealth.height / 100;
      const bmi = latestHealth.weight / (heightInMeters * heightInMeters);
      if (bmi >= 18.5 && bmi <= 24.9) score += 10;
      else if (bmi < 16 || bmi > 30) score -= 15;
      else score -= 5;
    }
    
    // Adjust for allergies
    if (latestHealth.allergies && latestHealth.allergies.length > 0) {
      score -= latestHealth.allergies.length * 2;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  // Determine health status based on score
  const getHealthStatus = (score) => {
    if (score >= 90) return 'healthy';
    if (score >= 70) return 'needs-attention';
    return 'at-risk';
  };

  // Determine risk level based on health data
  const getRiskLevel = (healthData) => {
    if (!healthData || healthData.length === 0) return 'medium';
    
    const latestHealth = healthData[0];
    if (latestHealth.allergies && latestHealth.allergies.length > 3) return 'high';
    
    const score = calculateHealthScore(healthData);
    if (score < 60) return 'high';
    if (score < 80) return 'medium';
    return 'low';
  };

  // Get test results information
  const getTestResults = (testResults) => {
    if (!testResults || testResults.length === 0) return { completed: 0, pending: 0 };
    
    // This is a simplified example - adjust based on your actual test status logic
    const completed = testResults.filter(test => test.result !== 'pending').length;
    return {
      completed,
      pending: testResults.length - completed
    };
  };

  // Get last assessment date
  const getLastAssessment = (testResults) => {
    if (!testResults || testResults.length === 0) return 'N/A';
    
    // Sort by date and get the most recent
    const sorted = [...testResults].sort((a, b) => 
      new Date(b.updated_at) - new Date(a.updated_at)
    );
    return sorted[0].updated_at.split('T')[0];
  };

  // Aggregate data calculations
  const aggregateData = {
    totalStudents: students.length,
    healthyStudents: students.filter(s => getHealthStatus(calculateHealthScore(s.healthdata)) === 'healthy').length,
    studentsNeedingAttention: students.filter(s => 
      getHealthStatus(calculateHealthScore(s.healthdata)) === 'needs-attention').length,
    averageScore: students.length > 0 
      ? students.reduce((sum, student) => sum + calculateHealthScore(student.healthdata), 0) / students.length
      : 0
  };

  // Risk distribution data
  const riskDistributionData = [
    { 
      name: 'Low Risk', 
      value: students.filter(s => getRiskLevel(s.healthdata) === 'low').length,
      color: '#10b981' 
    },
    { 
      name: 'Medium Risk', 
      value: students.filter(s => getRiskLevel(s.healthdata) === 'medium').length,
      color: '#f59e0b' 
    },
    { 
      name: 'High Risk', 
      value: students.filter(s => getRiskLevel(s.healthdata) === 'high').length,
      color: '#ef4444' 
    }
  ];

  // Class performance data
  const classPerformanceData = Array.from(
    new Set(students.map(s => s.class_group))
  )
  .filter(Boolean)
  .map(classGroup => {
    const classStudents = students.filter(s => s.class_group === classGroup);
    const avgScore = classStudents.length > 0
      ? classStudents.reduce((sum, student) => sum + calculateHealthScore(student.healthdata), 0) / classStudents.length
      : 0;
      
    return {
      class: `Grade ${classGroup}`,
      avgScore,
      students: classStudents.length
    };
  });

  // Monthly trends data (mock - replace with actual data if available)
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
  { name: 'Low Risk', value: 70, color: '#10b981' },
  { name: 'Medium Risk', value: 30, color: '#f59e0b' },
  { name: 'High Risk', value: 12, color: '#ef4444' }
];

export function Reports({isAuthenticated}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
   const [students, setStudents] = useState([]);
     const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/students/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
      console.log("Students:", data);
    } catch (err) {
      console.error("Error fetching students:", err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated]);

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

  if (loading) {
    return <div className="flex-1 p-6">Loading student data...</div>;
  }

  if (error) {
    return <div className="flex-1 p-6 text-red-600">Error: {error}</div>;
  }

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
                  {aggregateData.totalStudents > 0 
                    ? Math.round((aggregateData.healthyStudents / aggregateData.totalStudents) * 100)
                    : 0}% of total
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
                  {aggregateData.totalStudents > 0 
                    ? Math.round((aggregateData.studentsNeedingAttention / aggregateData.totalStudents) * 100)
                    : 0}% of total
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
                <p className="text-2xl font-bold">{Math.round(aggregateData.averageScore)}%</p>
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
                {students
                  .flatMap(student => 
                    (student.testresults || []).map(test => ({
                      student: student.name,
                      assessment: test.test,
                      status: test.result === 'pending' ? 'pending' : 'completed',
                      date: test.updated_at.split('T')[0]
                    }))
                  )
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 4)
                  .map((activity, index) => (
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
                Showing {filteredStudents.length} of {students.length} students
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
                  {filteredStudents.map((student) => {
                    const healthScore = calculateHealthScore(student.healthdata);
                    const healthStatus = getHealthStatus(healthScore);
                    const riskLevel = getRiskLevel(student.healthdata);
                    const testResults = getTestResults(student.testresults);
                    const lastAssessment = getLastAssessment(student.testresults);
                    const age = calculateAge(student.date_of_birth);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">Age: {age}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {student.class_group ? `Grade ${student.class_group}` : 'Ungrouped'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getHealthBadgeVariant(healthStatus)}>
                            {healthStatus === 'healthy' ? 'Healthy' : 'Needs Attention'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskBadgeVariant(riskLevel)}>
                            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="text-green-600">{testResults.completed} completed</span>
                            {testResults.pending > 0 && (
                              <span className="text-orange-600 block">{testResults.pending} pending</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{Math.round(healthScore)}%</span>
                            <Progress value={healthScore} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>{lastAssessment}</TableCell>
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
                    );
                  })}
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
                    { ageGroup: '6-8 years', minAge: 6, maxAge: 8 },
                    { ageGroup: '9-11 years', minAge: 9, maxAge: 11 },
                    { ageGroup: '12-14 years', minAge: 12, maxAge: 14 }
                  ].map((group, index) => {
                    const groupStudents = students.filter(student => {
                      const age = calculateAge(student.date_of_birth);
                      return age >= group.minAge && age <= group.maxAge;
                    });
                    
                    const avgScore = groupStudents.length > 0
                      ? groupStudents.reduce((sum, student) => sum + calculateHealthScore(student.healthdata), 0) / groupStudents.length
                      : 0;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{group.ageGroup} ({groupStudents.length} students)</span>
                          <span className="font-medium">{Math.round(avgScore)}%</span>
                        </div>
                        <Progress value={avgScore} />
                      </div>
                    );
                  })}
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
                  {students.length > 0 && (
                    <>
                      {Array.from(
                        new Set(students.flatMap(s => 
                          (s.testresults || []).map(t => t.test)
                        ))
                      )
                      .filter(Boolean)
                      .slice(0, 4) // Limit to 4 assessments for display
                      .map((assessment, index) => {
                        const allTests = students.flatMap(s => 
                          (s.testresults || []).filter(t => t.test === assessment)
                        );
                        const completed = allTests.filter(t => t.result !== 'pending').length;
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{assessment}</span>
                              <span className="font-medium">
                                {completed}/{allTests.length} ({allTests.length > 0 ? Math.round((completed/allTests.length)*100) : 0}%)
                              </span>
                            </div>
                            <Progress value={allTests.length > 0 ? (completed/allTests.length)*100 : 0} />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}