import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Eye, 
  Shield, 
  Syringe, 
  FileText, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Plus
} from 'lucide-react';

const mockVisionData = [
  { id: 1, child: 'Emma Johnson', date: '2025-07-01', leftEye: '20/20', rightEye: '20/20', status: 'Normal' },
  { id: 2, child: 'Liam Smith', date: '2025-06-15', leftEye: '20/25', rightEye: '20/20', status: 'Slight concern' },
];

const mockVaccinations = [
  { id: 1, child: 'Emma Johnson', vaccine: 'MMR', date: '2025-03-15', nextDue: '2026-03-15', status: 'up-to-date' },
  { id: 2, child: 'Emma Johnson', vaccine: 'DTaP', date: '2025-02-10', nextDue: '2026-02-10', status: 'up-to-date' },
  { id: 3, child: 'Liam Smith', vaccine: 'HPV', date: '2025-01-20', nextDue: '2025-08-20', status: 'due-soon' },
];

const mockAllergies = [
  { id: 1, child: 'Emma Johnson', allergen: 'Peanuts', severity: 'Severe', reaction: 'Anaphylaxis', discovered: '2022-05-10' },
  { id: 2, child: 'Emma Johnson', allergen: 'Shellfish', severity: 'Moderate', reaction: 'Hives', discovered: '2023-08-15' },
  { id: 3, child: 'Liam Smith', allergen: 'Dust mites', severity: 'Mild', reaction: 'Sneezing', discovered: '2021-11-30' },
];

const mockMedicalHistory = [
  { id: 1, child: 'Emma Johnson', date: '2025-07-15', condition: 'Regular Checkup', doctor: 'Dr. Smith', notes: 'All normal' },
  { id: 2, child: 'Liam Smith', date: '2025-07-10', condition: 'Asthma Follow-up', doctor: 'Dr. Johnson', notes: 'Stable condition' },
];

export function HealthMonitoring() {
  const [selectedChild, setSelectedChild] = useState('all');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'up-to-date':
        return <Badge className="bg-green-100 text-green-800">Up to Date</Badge>;
      case 'due-soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity.toLowerCase()) {
      case 'severe':
        return <Badge variant="destructive">Severe</Badge>;
      case 'moderate':
        return <Badge className="bg-orange-100 text-orange-800">Moderate</Badge>;
      case 'mild':
        return <Badge className="bg-green-100 text-green-800">Mild</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>Health Monitoring</h1>
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
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vision" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vision">
            <Eye className="w-4 h-4 mr-2" />
            Vision
          </TabsTrigger>
          <TabsTrigger value="allergies">
            <Shield className="w-4 h-4 mr-2" />
            Allergies
          </TabsTrigger>
          <TabsTrigger value="vaccinations">
            <Syringe className="w-4 h-4 mr-2" />
            Vaccinations
          </TabsTrigger>
          <TabsTrigger value="medical">
            <FileText className="w-4 h-4 mr-2" />
            Medical History
          </TabsTrigger>
          <TabsTrigger value="cerebral">
            <Brain className="w-4 h-4 mr-2" />
            Cerebral Observations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vision" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vision Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Left Eye</TableHead>
                    <TableHead>Right Eye</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVisionData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.child}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.leftEye}</TableCell>
                      <TableCell>{record.rightEye}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'Normal' ? 'default' : 'secondary'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAllergies.map((allergy) => (
              <Card key={allergy.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{allergy.allergen}</CardTitle>
                    {getSeverityBadge(allergy.severity)}
                  </div>
                  <p className="text-sm text-muted-foreground">{allergy.child}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Reaction</p>
                    <p>{allergy.reaction}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Discovered</p>
                    <p className="text-sm">{allergy.discovered}</p>
                  </div>
                  {allergy.severity === 'Severe' && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Severe allergy - requires immediate medical attention if exposed
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Last Dose</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVaccinations.map((vaccine) => (
                    <TableRow key={vaccine.id}>
                      <TableCell>{vaccine.child}</TableCell>
                      <TableCell>{vaccine.vaccine}</TableCell>
                      <TableCell>{vaccine.date}</TableCell>
                      <TableCell>{vaccine.nextDue}</TableCell>
                      <TableCell>{getStatusBadge(vaccine.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Schedule</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Condition/Visit</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMedicalHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.child}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.condition}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.notes}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View Full</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cerebral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Motor Skills</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Language Development</span>
                    <span className="text-sm">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Social Skills</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Cognitive Development</span>
                    <span className="text-sm">88%</span>
                  </div>
                  <Progress value={88} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Observations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Age-appropriate behavior</p>
                    <p className="text-xs text-muted-foreground">Emma - July 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Slight attention concerns</p>
                    <p className="text-xs text-muted-foreground">Liam - July 10, 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Excellent social interaction</p>
                    <p className="text-xs text-muted-foreground">Emma - June 20, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}