import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Calendar, AlertTriangle, CheckCircle, TrendingUp, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const mockChildren = [
  { id: 1, name: 'Emma Johnson', age: 8, lastCheckup: '2025-07-15', status: 'healthy' },
  { id: 2, name: 'Liam Smith', age: 12, lastCheckup: '2025-07-10', status: 'needs-attention' },
  { id: 3, name: 'Sophia Davis', age: 6, lastCheckup: '2025-07-20', status: 'healthy' },
  { id: 4, name: 'Noah Wilson', age: 10, lastCheckup: '2025-07-05', status: 'healthy' },
];

const growthData = [
  { month: 'Jan', height: 120, weight: 25 },
  { month: 'Feb', height: 121, weight: 25.5 },
  { month: 'Mar', height: 122, weight: 26 },
  { month: 'Apr', height: 123, weight: 26.5 },
  { month: 'May', height: 124, weight: 27 },
  { month: 'Jun', height: 125, weight: 27.5 },
];

const vaccineData = [
  { name: 'Up to Date', value: 75, color: '#22c55e' },
  { name: 'Due Soon', value: 20, color: '#f59e0b' },
  { name: 'Overdue', value: 5, color: '#ef4444' },
];

export function Dashboard({ onViewChild }) {
  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Checkup
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 boys, 2 girls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Checkups</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Vaccination due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Children Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Children Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockChildren.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {child.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-muted-foreground">Age: {child.age}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <div>
                      <Badge variant={child.status === 'healthy' ? 'default' : 'destructive'}>
                        {child.status === 'healthy' ? 'Healthy' : 'Needs Attention'}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last: {child.lastCheckup}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onViewChild && onViewChild(child.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vaccination Status */}
        <Card>
          <CardHeader>
            <CardTitle>Vaccination Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={vaccineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vaccineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {vaccineData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}