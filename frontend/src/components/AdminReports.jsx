import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download, 
  FileText, 
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const API_URL = 'http://localhost:8000/api/students/'; // Replace with your actual API endpoint

export function AdminReports() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

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
    
    // Simple scoring logic - adjust based on your requirements
    const latestHealth = healthData[0]; // Assuming the first is the latest
    let score = 80; // Base score
    
    // Adjust based on BMI (very simple calculation)
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
    
    // Ensure score is within bounds
    return Math.max(0, Math.min(100, score));
  };

  // Determine health status based on score
  const getHealthStatus = (score) => {
    if (score >= 90) return 'healthy';
    if (score >= 70) return 'needs-attention';
    return 'at-risk';
  };

  // Get vaccination status (mock - you'll need to implement based on your data)
  const getVaccinationStatus = (student) => {
    // This is a placeholder - implement based on your vaccination data
    const randomStatus = Math.random();
    if (randomStatus > 0.8) return 'overdue';
    if (randomStatus > 0.5) return 'due-soon';
    return 'up-to-date';
  };

  // Get last checkup date from health data
  const getLastCheckup = (healthData) => {
    if (!healthData || healthData.length === 0) return 'N/A';
    return healthData[0].updated_at.split('T')[0]; // Just the date part
  };

  // Get unique class groups for filter
  const classGroups = [...new Set(students.map(student => 
    student.class_group ? `Grade ${student.class_group}` : 'Ungrouped'
  ))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || 
      (student.class_group ? `Grade ${student.class_group}` : 'Ungrouped') === selectedClass;
    
    const healthScore = calculateHealthScore(student.healthdata);
    const healthStatus = getHealthStatus(healthScore);
    const matchesStatus = selectedStatus === 'all' || healthStatus === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Calculate overview data based on actual students
  const overviewData = [
    { 
      name: 'Healthy', 
      value: students.filter(s => getHealthStatus(calculateHealthScore(s.healthdata)) === 'healthy').length / students.length * 100 || 0,
      color: '#22c55e' 
    },
    { 
      name: 'Needs Attention', 
      value: students.filter(s => getHealthStatus(calculateHealthScore(s.healthdata)) === 'needs-attention').length / students.length * 100 || 0,
      color: '#f59e0b' 
    },
    { 
      name: 'At Risk', 
      value: students.filter(s => getHealthStatus(calculateHealthScore(s.healthdata)) === 'at-risk').length / students.length * 100 || 0,
      color: '#ef4444' 
    }
  ];

  // Calculate assessment data (mock - replace with actual test results if available)
  const assessmentData = [
    { subject: 'Physical', average: 85 },
    { subject: 'Cognitive', average: 82 },
    { subject: 'Social', average: 88 },
    { subject: 'Emotional', average: 84 }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'needs-attention':
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>;
      case 'at-risk':
        return <Badge variant="destructive">At Risk</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getVaccinationBadge = (status) => {
    switch (status) {
      case 'up-to-date':
        return <Badge className="bg-green-100 text-green-800">Up to Date</Badge>;
      case 'due-soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
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
          <h1>All Children Reports</h1>
          <p className="text-sm text-muted-foreground">School administrative access to all student health records</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All Reports
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Summary
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Across all grades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {students.filter(s => getHealthStatus(calculateHealthScore(s.healthdata)) === 'needs-attention').length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {students.filter(s => getHealthStatus(calculateHealthScore(s.healthdata)) === 'at-risk').length}
            </div>
            <p className="text-xs text-muted-foreground">Need immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {students.length > 0 
                ? Math.round(students.reduce((sum, student) => sum + calculateHealthScore(student.healthdata), 0) / students.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">School average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Student Records</TabsTrigger>
          <TabsTrigger value="analytics">Health Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Health Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="needs-attention">Needs Attention</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student Table */}
          <Card>
            <CardHeader>
              <CardTitle>Student Health Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Health Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vaccinations</TableHead>
                    <TableHead>Last Checkup</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const healthScore = calculateHealthScore(student.healthdata);
                    const healthStatus = getHealthStatus(healthScore);
                    const vaccinationStatus = getVaccinationStatus(student);
                    const lastCheckup = getLastCheckup(student.healthdata);
                    const age = calculateAge(student.date_of_birth);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{age}</TableCell>
                        <TableCell>{student.class_group ? `Grade ${student.class_group}` : 'Ungrouped'}</TableCell>
                        <TableCell>
                          <span className={`font-bold ${getHealthScoreColor(healthScore)}`}>
                            {healthScore}%
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(healthStatus)}</TableCell>
                        <TableCell>{getVaccinationBadge(vaccinationStatus)}</TableCell>
                        <TableCell>{lastCheckup}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Health Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Health Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={overviewData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {overviewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {overviewData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {Math.round(item.value)}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Averages */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Score Averages</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={assessmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Class Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {classGroups.map((className) => {
                  const classStudents = students.filter(student => 
                    student.class_group ? `Grade ${student.class_group}` === className : className === 'Ungrouped'
                  );
                  
                  if (classStudents.length === 0) return null;
                  
                  const avgHealthScore = classStudents.length > 0 
                    ? Math.round(classStudents.reduce((sum, student) => sum + calculateHealthScore(student.healthdata), 0) / classStudents.length)
                    : 0;
                  
                  const alertCount = classStudents.filter(s => 
                    getHealthStatus(calculateHealthScore(s.healthdata)) === 'needs-attention'
                  ).length;
                  
                  const atRiskCount = classStudents.filter(s => 
                    getHealthStatus(calculateHealthScore(s.healthdata)) === 'at-risk'
                  ).length;
                  
                  return (
                    <div key={className} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{className}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Students</span>
                          <span className="text-sm font-medium">
                            {classStudents.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Avg Health Score</span>
                          <span className={`text-sm font-medium ${getHealthScoreColor(avgHealthScore)}`}>
                            {avgHealthScore}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Alerts</span>
                          <span className="text-sm font-medium text-yellow-600">{alertCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">At Risk</span>
                          <span className="text-sm font-medium text-red-600">{atRiskCount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Health Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.filter(student => {
                  const healthScore = calculateHealthScore(student.healthdata);
                  return getHealthStatus(healthScore) !== 'healthy';
                }).map(student => {
                  const healthScore = calculateHealthScore(student.healthdata);
                  const healthStatus = getHealthStatus(healthScore);
                  const className = student.class_group ? `Grade ${student.class_group}` : 'Ungrouped';
                  
                  return (
                    <div 
                      key={student.id}
                      className={`flex items-start space-x-4 p-4 border-l-4 rounded-lg ${
                        healthStatus === 'at-risk' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-yellow-500 bg-yellow-50'
                      }`}
                    >
                      <AlertTriangle className={`w-5 h-5 mt-1 ${
                        healthStatus === 'at-risk' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {healthStatus === 'at-risk' ? 'Health Risk' : 'Needs Attention'} - {student.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {className} - Health score: {healthScore}%
                          {student.healthdata?.[0]?.allergies?.length > 0 && 
                            ` - Allergies: ${student.healthdata[0].allergies.join(', ')}`
                          }
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Priority: {healthStatus === 'at-risk' ? 'High' : 'Medium'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Contact Parent</Button>
                        <Button size="sm" variant="outline">Schedule Checkup</Button>
                      </div>
                    </div>
                  );
                })}

                {students.filter(student => 
                  getHealthStatus(calculateHealthScore(student.healthdata)) !== 'healthy'
                ).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>All students are currently healthy with no alerts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}