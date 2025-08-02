import React, { useState } from 'react';
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

const mockAllChildrenData = [
  {
    id: 1,
    name: 'Emma Johnson',
    age: 8,
    className: 'Grade 3A',
    healthScore: 94,
    lastCheckup: '2025-07-15',
    status: 'healthy',
    alerts: 0,
    vaccinations: 'up-to-date',
    assessments: [
      { type: 'Motor Skills', score: 85, status: 'good' },
      { type: 'Cognitive', score: 92, status: 'excellent' }
    ]
  },
  {
    id: 2,
    name: 'Liam Smith',
    age: 12,
    className: 'Grade 7B',
    healthScore: 78,
    lastCheckup: '2025-07-10',
    status: 'needs-attention',
    alerts: 1,
    vaccinations: 'due-soon',
    assessments: [
      { type: 'Cognitive', score: 78, status: 'good' }
    ]
  },
  {
    id: 3,
    name: 'Sophia Davis',
    age: 6,
    className: 'Grade 1A',
    healthScore: 96,
    lastCheckup: '2025-07-20',
    status: 'healthy',
    alerts: 0,
    vaccinations: 'up-to-date',
    assessments: [
      { type: 'Motor Skills', score: 90, status: 'excellent' }
    ]
  },
  {
    id: 4,
    name: 'Noah Wilson',
    age: 10,
    className: 'Grade 5A',
    healthScore: 88,
    lastCheckup: '2025-07-05',
    status: 'healthy',
    alerts: 0,
    vaccinations: 'up-to-date',
    assessments: [
      { type: 'Social Skills', score: 88, status: 'good' }
    ]
  }
];

const overviewData = [
  { name: 'Healthy', value: 75, color: '#22c55e' },
  { name: 'Needs Attention', value: 20, color: '#f59e0b' },
  { name: 'At Risk', value: 5, color: '#ef4444' }
];

const assessmentData = [
  { subject: 'Motor Skills', average: 85 },
  { subject: 'Cognitive', average: 82 },
  { subject: 'Language', average: 88 },
  { subject: 'Social Skills', average: 84 }
];

export function AdminReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredChildren = mockAllChildrenData.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || child.className === selectedClass;
    const matchesStatus = selectedStatus === 'all' || child.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

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
            <div className="text-2xl font-bold">{mockAllChildrenData.length}</div>
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
              {mockAllChildrenData.reduce((sum, child) => sum + child.alerts, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Checkups</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89%</div>
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
                <SelectItem value="Grade 1A">Grade 1A</SelectItem>
                <SelectItem value="Grade 3A">Grade 3A</SelectItem>
                <SelectItem value="Grade 5A">Grade 5A</SelectItem>
                <SelectItem value="Grade 7B">Grade 7B</SelectItem>
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
                  {filteredChildren.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell className="font-medium">{child.name}</TableCell>
                      <TableCell>{child.age}</TableCell>
                      <TableCell>{child.className}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getHealthScoreColor(child.healthScore)}`}>
                          {child.healthScore}%
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(child.status)}</TableCell>
                      <TableCell>{getVaccinationBadge(child.vaccinations)}</TableCell>
                      <TableCell>{child.lastCheckup}</TableCell>
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
                  ))}
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
                      <span className="text-sm">{item.name}: {item.value}%</span>
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
                {['Grade 1A', 'Grade 3A', 'Grade 5A', 'Grade 7B'].map((className) => (
                  <div key={className} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{className}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Students</span>
                        <span className="text-sm font-medium">
                          {mockAllChildrenData.filter(child => child.className === className).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg Health Score</span>
                        <span className="text-sm font-medium text-green-600">91%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Alerts</span>
                        <span className="text-sm font-medium">0</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                <div className="flex items-start space-x-4 p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium">Vaccination Due</h4>
                    <p className="text-sm text-muted-foreground">
                      Liam Smith (Grade 7B) - HPV vaccination due in 2 weeks
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Priority: Medium</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Contact Parent</Button>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium">Assessment Follow-up</h4>
                    <p className="text-sm text-muted-foreground">
                      Liam Smith (Grade 7B) - Cognitive assessment showed areas for improvement
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Priority: Low</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Report</Button>
                    <Button size="sm" variant="outline">Schedule Meeting</Button>
                  </div>
                </div>

                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>All other students are up to date with their health requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}