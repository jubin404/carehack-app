import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  Mail,
  Smartphone,
  Clock,
  Plus,
  X
} from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'vaccination',
    title: 'Vaccination Due',
    message: 'Emma Johnson - Annual flu shot due in 2 weeks (September 15, 2025)',
    date: '2025-08-01',
    priority: 'high',
    read: false,
    child: 'Emma Johnson'
  },
  {
    id: 2,
    type: 'checkup',
    title: 'Checkup Reminder',
    message: 'Liam Smith - Regular checkup scheduled for tomorrow at 10:00 AM',
    date: '2025-08-01',
    priority: 'medium',
    read: false,
    child: 'Liam Smith'
  },
  {
    id: 3,
    type: 'assessment',
    title: 'Assessment Complete',
    message: 'Emma Johnson - Motor skills assessment results are now available',
    date: '2025-07-30',
    priority: 'low',
    read: true,
    child: 'Emma Johnson'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Growth Milestone',
    message: 'Liam Smith has reached a new height milestone (150cm)',
    date: '2025-07-28',
    priority: 'low',
    read: true,
    child: 'Liam Smith'
  }
];

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    vaccinationReminders: true,
    checkupReminders: true,
    assessmentResults: true,
    growthMilestones: false,
    reminderTiming: '7', // days before
    emergencyContacts: ['parent@example.com', '+1234567890']
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'vaccination':
        return <Calendar className="w-4 h-4" />;
      case 'checkup':
        return <Clock className="w-4 h-4" />;
      case 'assessment':
        return <CheckCircle className="w-4 h-4" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="alerts">Custom Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Mark All Read</Button>
              <Button variant="outline" size="sm">Clear All</Button>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-muted/50' : ''
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h4>
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{notification.date}</span>
                          <span>Child: {notification.child}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4" />
                      <Label htmlFor="email">Email Notifications</Label>
                    </div>
                    <Switch 
                      id="email"
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => setPreferences({...preferences, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-4 h-4" />
                      <Label htmlFor="sms">SMS Notifications</Label>
                    </div>
                    <Switch 
                      id="sms"
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) => setPreferences({...preferences, smsNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-4 h-4" />
                      <Label htmlFor="push">Push Notifications</Label>
                    </div>
                    <Switch 
                      id="push"
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => setPreferences({...preferences, pushNotifications: checked})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vaccination">Vaccination Reminders</Label>
                    <Switch 
                      id="vaccination"
                      checked={preferences.vaccinationReminders}
                      onCheckedChange={(checked) => setPreferences({...preferences, vaccinationReminders: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="checkup">Checkup Reminders</Label>
                    <Switch 
                      id="checkup"
                      checked={preferences.checkupReminders}
                      onCheckedChange={(checked) => setPreferences({...preferences, checkupReminders: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="assessment">Assessment Results</Label>
                    <Switch 
                      id="assessment"
                      checked={preferences.assessmentResults}
                      onCheckedChange={(checked) => setPreferences({...preferences, assessmentResults: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="growth">Growth Milestones</Label>
                    <Switch 
                      id="growth"
                      checked={preferences.growthMilestones}
                      onCheckedChange={(checked) => setPreferences({...preferences, growthMilestones: checked})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Reminder Timing</h4>
                <div className="flex items-center space-x-2">
                  <Label>Send reminders</Label>
                  <Select value={preferences.reminderTiming} onValueChange={(value) => setPreferences({...preferences, reminderTiming: value})}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="14">14</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label>days before due date</Label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Emergency Contacts</h4>
                <div className="space-y-2">
                  {preferences.emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input value={contact} readOnly />
                      <Button size="sm" variant="outline">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alertChild">Child</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select child" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emma">Emma Johnson</SelectItem>
                      <SelectItem value="liam">Liam Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alertType">Alert Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medication">Medication Reminder</SelectItem>
                      <SelectItem value="appointment">Appointment</SelectItem>
                      <SelectItem value="milestone">Growth Milestone</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="alertMessage">Alert Message</Label>
                <Textarea 
                  id="alertMessage"
                  placeholder="Enter alert message..."
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="alertDate">Alert Date</Label>
                  <Input type="date" id="alertDate" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="alertTime">Alert Time</Label>
                  <Input type="time" id="alertTime" className="mt-2" />
                </div>
              </div>
              <Button className="w-full">Create Alert</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Custom Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Medication Reminder - Emma</p>
                    <p className="text-sm text-muted-foreground">Daily vitamin at 8:00 AM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No other custom alerts set up yet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}