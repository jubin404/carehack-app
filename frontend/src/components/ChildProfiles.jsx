import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Plus,
  Edit,
  Eye,
  Calendar,
  Weight,
  Ruler,
  ArrowLeft,
  Save,
  X,
  Syringe,
  Shield,
  FileText,
  Brain,
  CheckCircle,
  AlertTriangle,
  Download,
  TrendingUp,
  Play,
  Clock,
  Trash2,
  MoreVertical,
  Filter,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const availableTests = [
  {
    id: "color-blindness",
    name: "Color Vision Test",
    description: "Screen for color blindness using Ishihara plates",
    duration: "5-10 min",
    icon: Eye,
    ageRange: "4+ years",
  },
  {
    id: "adhd-screening",
    name: "ADHD Screening",
    description: "Behavioral assessment for attention and hyperactivity",
    duration: "10-15 min",
    icon: Brain,
    ageRange: "6+ years",
  },
  {
    id: "visual-acuity",
    name: "Visual Acuity Test",
    description: "Basic vision clarity and sharpness assessment",
    duration: "5-8 min",
    icon: Eye,
    ageRange: "3+ years",
  },
];

const mockChildren = [
  {
    id: 1,
    name: "Emma Johnson",
    age: 8,
    gender: "Female",
    birthDate: "2017-03-15",
    height: 125,
    weight: 27.5,
    bloodType: "A+",
    allergies: ["Peanuts", "Shellfish"],
    lastCheckup: "2025-07-15",
    status: "healthy",
    visionReports: [
      {
        id: 1,
        date: "2025-07-01",
        leftEye: "20/20",
        rightEye: "20/20",
        status: "Normal",
      },
    ],
    vaccinations: [
      {
        id: 1,
        vaccine: "MMR",
        date: "2025-03-15",
        nextDue: "2026-03-15",
        status: "up-to-date",
      },
      {
        id: 2,
        vaccine: "DTaP",
        date: "2025-02-10",
        nextDue: "2026-02-10",
        status: "up-to-date",
      },
    ],
    medicalHistory: [
      {
        id: 1,
        date: "2025-07-15",
        condition: "Regular Checkup",
        doctor: "Dr. Smith",
        notes: "All normal",
      },
    ],
    assessments: [
      {
        id: 1,
        type: "Motor Skills Assessment",
        date: "2025-07-01",
        status: "completed",
        score: 85,
      },
    ],
    growthData: [
      { month: "Jan", height: 118, weight: 24.5 },
      { month: "Feb", height: 119, weight: 25.0 },
      { month: "Mar", height: 120, weight: 25.5 },
      { month: "Apr", height: 122, weight: 26.0 },
      { month: "May", height: 123, weight: 26.8 },
      { month: "Jun", height: 125, weight: 27.5 },
    ],
    completedTests: [
      {
        id: 1,
        testType: "color-blindness",
        testName: "Color Vision Test",
        date: "2025-07-20",
        score: 85,
        status: "completed",
        result: "Normal color vision detected. No signs of color blindness.",
      },
      {
        id: 2,
        testType: "visual-acuity",
        testName: "Visual Acuity Test",
        date: "2025-07-18",
        score: 92,
        status: "completed",
        result: "Excellent visual acuity. 20/20 vision in both eyes.",
      },
    ],
  },
  {
    id: 2,
    name: "Liam Smith",
    age: 12,
    gender: "Male",
    birthDate: "2013-08-22",
    height: 150,
    weight: 45,
    bloodType: "O+",
    allergies: ["Dust mites"],
    lastCheckup: "2025-07-10",
    status: "needs-attention",
    visionReports: [
      {
        id: 1,
        date: "2025-06-15",
        leftEye: "20/25",
        rightEye: "20/20",
        status: "Slight concern",
      },
    ],
    vaccinations: [
      {
        id: 1,
        vaccine: "HPV",
        date: "2025-01-20",
        nextDue: "2025-08-20",
        status: "due-soon",
      },
    ],
    medicalHistory: [
      {
        id: 1,
        date: "2025-07-10",
        condition: "Asthma Follow-up",
        doctor: "Dr. Johnson",
        notes: "Stable condition",
      },
    ],
    assessments: [
      {
        id: 1,
        type: "Cognitive Development",
        date: "2025-06-15",
        status: "completed",
        score: 78,
      },
    ],
    growthData: [
      { month: "Jan", height: 145, weight: 42 },
      { month: "Feb", height: 146, weight: 42.5 },
      { month: "Mar", height: 147, weight: 43 },
      { month: "Apr", height: 148, weight: 43.8 },
      { month: "May", height: 149, weight: 44.5 },
      { month: "Jun", height: 150, weight: 45 },
    ],
    completedTests: [
      {
        id: 1,
        testType: "adhd-screening",
        testName: "ADHD Screening",
        date: "2025-07-15",
        score: 68,
        status: "completed",
        result:
          "Mild attention challenges detected. Recommend follow-up with healthcare provider.",
      },
    ],
  },
];

export function ChildProfiles({
  onViewChild,
  onBackToList,
  selectedChildId,
  onTakeTest,
  isAuthenticated,
}) {
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [editingChildId, setEditingChildId] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);
  const [students, setStudents] = useState([]);
  const [activeReportFilter, setActiveReportFilter] = useState("all");
  const [newChild, setNewChild] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    bloodType: "",
    allergies: "",
    notes: "",
  });
  const [editChild, setEditChild] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
    address: "",
    contact: "",
    parent_email: "",
  });
  const [childHealth, setChildHealth] = useState({
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    notes: "",
  });
  const [testResults, setTestResults] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  // Add state for dialogs and new entries
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [newAllergy, setNewAllergy] = useState({ allergy: '', type: 'food' });
  const [showAddHealthData, setShowAddHealthData] = useState(false);
  const [newHealthData, setNewHealthData] = useState({ height: '', weight: '', blood_type: '' });
  const [showAddMedicalHistory, setShowAddMedicalHistory] = useState(false);
  const [newMedicalHistory, setNewMedicalHistory] = useState({ medical_condition: '' });
  const [showAddTestResult, setShowAddTestResult] = useState(false);
  const [newTestResult, setNewTestResult] = useState({ test: '', result: '', notes: '' });

  // Find the latest health data record
  const latestHealthData = (selectedChild && selectedChild.healthdata && selectedChild.healthdata.length > 0)
    ? selectedChild.healthdata[0]
    : null;

  // Save both student info and health data
  const handleSaveAll = async () => {
    try {
      // 1. Update student info
      const studentResponse = await fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editChild),
      });

      if (!studentResponse.ok) {
        throw new Error("Failed to update student");
      }

      // 2. Update or create health data
      const healthDataPayload = {
        height: editHealthData.height,
        weight: editHealthData.weight,
        blood_type: editHealthData.blood_type,
        student: selectedChild.id
      };

      let healthDataResponse;
      if (latestHealthData) {
        // Update existing health data
        healthDataResponse = await fetch(`http://localhost:8000/api/healthdata/${latestHealthData.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(healthDataPayload),
        });
      } else {
        // Create new health data
        healthDataResponse = await fetch("http://localhost:8000/api/healthdata/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(healthDataPayload),
        });
      }

      if (!healthDataResponse.ok) {
        throw new Error("Failed to update health data");
      }

      // 3. Refresh child details
      const updatedChildResponse = await fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      
      if (!updatedChildResponse.ok) {
        throw new Error("Failed to fetch updated child data");
      }

      const updatedChildData = await updatedChildResponse.json();
      setSelectedChild(updatedChildData);
      setIsEditingChild(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const [editHealthData, setEditHealthData] = useState({
    height: latestHealthData?.height || '',
    weight: latestHealthData?.weight || '',
    blood_type: latestHealthData?.blood_type || '',
  });

  // When selectedChild changes, update editHealthData
  useEffect(() => {
    if (selectedChild) {
      setEditChild({
        name: selectedChild.name,
        date_of_birth: selectedChild.date_of_birth,
        gender: selectedChild.gender,
        address: selectedChild.address,
        contact: selectedChild.contact,
        parent_email: selectedChild.parent_email,
        class_group: selectedChild.class_group,
      });

      if (selectedChild.healthdata && selectedChild.healthdata.length > 0) {
        const healthData = selectedChild.healthdata[0];
        setEditHealthData({
          height: healthData.height || '',
          weight: healthData.weight || '',
          blood_type: healthData.blood_type || '',
        });
      } else {
        setEditHealthData({
          height: '',
          weight: '',
          blood_type: '',
        });
      }
    }
  }, [selectedChild]);

  // Handler to update or add health data
  const handleSaveHealthData = async () => {
    try {
      const healthDataPayload = {
        height: editHealthData.height,
        weight: editHealthData.weight,
        blood_type: editHealthData.blood_type,
        student: selectedChild.id
      };

      let response;
      if (latestHealthData) {
        // Update existing health data
        response = await fetch(`http://localhost:8000/api/healthdata/${latestHealthData.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(healthDataPayload),
        });
      } else {
        // Create new health data
        response = await fetch("http://localhost:8000/api/healthdata/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(healthDataPayload),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save health data");
      }

      // Refresh child details
      const updatedChildResponse = await fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      
      if (!updatedChildResponse.ok) {
        throw new Error("Failed to fetch updated child data");
      }

      const updatedChildData = await updatedChildResponse.json();
      setSelectedChild(updatedChildData);
    } catch (error) {
      console.error("Error saving health data:", error);
      alert("Failed to save health data. Please try again.");
    }
  };

  // Fetch all students for listing
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/students/", {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setStudents([]);
    }
  };

  // Fetch all students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch selected child details from backend
  useEffect(() => {
    if (selectedChildId) {
      fetch(`http://localhost:8000/api/students/${selectedChildId}/`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => setSelectedChild(data))
        .catch(() => setSelectedChild(null));
    }
  }, [selectedChildId]);

  // Fetch test results when a child is selected
  useEffect(() => {
    if (selectedChildId) {
      fetch(`http://localhost:8000/api/testresults/?student=${selectedChildId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => setTestResults(data))
        .catch(err => setTestResults([]));
    }
  }, [selectedChildId]);

  // Helper to get the result for a specific test type
  const getTestResultForType = (testType) => {
    return testResults.find(tr => tr.test === testType);
  };

  const handleAddChild = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChild),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const data = await response.json();
      console.log("Student created:", data);
      setIsAddingChild(false);
      setNewChild({
        name: "",
        date_of_birth: "",
        gender: "",
        address: "",
        contact: "",
        parent_email: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error adding child:", error);
    }
  };

  // Add Allergy
  const handleAddAllergy = async () => {
    await fetch("http://localhost:8000/api/allergies/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newAllergy),
    });
    setShowAddAllergy(false);
    setNewAllergy({ allergy: '', type: 'food' });
    // Refresh child details
    fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setSelectedChild(data));
  };

  // Add Health Data
  const handleAddHealthData = async () => {
    await fetch("http://localhost:8000/api/healthdata/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...newHealthData, student: selectedChild.id }),
    });
    setShowAddHealthData(false);
    setNewHealthData({ height: '', weight: '', blood_type: '' });
    fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setSelectedChild(data));
  };

  // Add Medical History
  const handleAddMedicalHistory = async () => {
    await fetch("http://localhost:8000/api/medicalhistory/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...newMedicalHistory, student: selectedChild.id }),
    });
    setShowAddMedicalHistory(false);
    setNewMedicalHistory({ medical_condition: '' });
    fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setSelectedChild(data));
  };

  // Add Test Result
  const handleAddTestResult = async () => {
    await fetch("http://localhost:8000/api/testresults/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...newTestResult, student: selectedChild.id }),
    });
    setShowAddTestResult(false);
    setNewTestResult({ test: '', result: '', notes: '' });
    fetch(`http://localhost:8000/api/students/${selectedChild.id}/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setSelectedChild(data));
  };

  // When a child is selected from the list, set selectedChild
  const handleSelectChild = (childId) => {
    fetch(`http://localhost:8000/api/students/${childId}/`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setSelectedChild(data))
      .catch(() => setSelectedChild(null));
  };

  // Edit handler
  const handleEditChild = () => {
    setIsEditingChild(true);
  };

  // Update handler
  const handleUpdateChild = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/students/${selectedChild.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editChild),
        }
      );
      if (!response.ok) throw new Error("Failed to update student");
      const data = await response.json();
      setSelectedChild(data);
      setIsEditingChild(false);
      fetchStudents(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleChildHealthCare = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/students/${editingChildId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(childHealth),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      const data = await response.json();
      console.log("Student updated:", data);
      handleUpdateChild;
      // Reset state
      setIsEditingChild(false);
      setEditingChildId(null);
      setChildHealth({
        height: "",
        weight: "",
        bloodType: "",
        allergies: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteChild = async (childId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this child?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/students/${childId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete child");
      }
      fetchStudents();
    } catch (error) {
      console.error("Error deleting child:", error);
    }
  };

  const handleViewReport = (test) => {
    setViewingReport(test);
  };

  const handleExportReport = (test) => {
    console.log("Exporting report:", test);
    alert("Report would be exported as PDF in a real application");
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "up-to-date":
        return (
          <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
        );
      case "due-soon":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>
        );
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case "severe":
        return <Badge variant="destructive">Severe</Badge>;
      case "moderate":
        return (
          <Badge className="bg-orange-100 text-orange-800">Moderate</Badge>
        );
      case "mild":
        return <Badge className="bg-green-100 text-green-800">Mild</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getTestCompletionStatus = (testId) => {
    if (!selectedChild || !selectedChild.testresults) return null;
    return selectedChild.testresults.find(
      (test) => test.test === testId
    );
  };
  const calculateAge = (dateString) => {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassedThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
};


  // Mock reports data for the child
  const mockReports = [
    {
      id: 1,
      type: "Health Assessment",
      date: "2025-07-20",
      status: "completed",
      summary: "Overall health is excellent. All vital signs normal.",
      category: "health",
    },
    {
      id: 2,
      type: "Development Milestone",
      date: "2025-07-15",
      status: "completed",
      summary: "Motor skills development on track for age group.",
      category: "development",
    },
    {
      id: 3,
      type: "Vision Screening",
      date: "2025-07-10",
      status: "completed",
      summary: "Visual acuity test shows 20/20 vision in both eyes.",
      category: "vision",
    },
    {
      id: 4,
      type: "Behavioral Assessment",
      date: "2025-07-05",
      status: "pending",
      summary: "ADHD screening scheduled for next week.",
      category: "behavioral",
    },
  ];

  const filteredReports =
    activeReportFilter === "all"
      ? mockReports
      : mockReports.filter((report) => report.category === activeReportFilter);

  // If a child is selected, show detailed view
  if (selectedChild === null && selectedChildId) {
    return <div className="p-6">Loading child details...</div>;
  }
  if (selectedChildId && !selectedChild) {
    return <div className="p-6 text-red-600">Child not found.</div>;
  }
  if (selectedChildId) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onBackToList}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Children
            </Button>
            <div>
              <h1>{selectedChild.name}</h1>
              <p className="text-sm text-muted-foreground">
                Age: {selectedChild.age} • {selectedChild.gender} • Last
                checkup: {selectedChild.lastCheckup}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleEditChild}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleDeleteChild(selectedChild.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Monitoring</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Basic Info Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-lg">
                          {selectedChild.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedChild.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Born: {selectedChild.date_of_birth}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="font-medium"> {calculateAge(selectedChild.date_of_birth)} years years</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{selectedChild.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Blood Type
                        </p>
                        <Badge variant="outline">
                          {latestHealthData?.blood_type || "Not set"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge
                          variant={
                            selectedChild.status === "healthy"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {selectedChild.status === "healthy"
                            ? "Healthy"
                            : "Needs Attention"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Measurements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="text-xl font-bold">
                        {latestHealthData?.height || "-"} cm
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="text-xl font-bold">
                        {latestHealthData?.weight || "-"} kg
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">BMI</p>
                      <p className="text-xl font-bold">
                        {latestHealthData?.height && latestHealthData?.weight 
                          ? calculateBMI(latestHealthData.weight, latestHealthData.height)
                          : "-"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Available Assessment Tests</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Interactive tests to screen for various health and
                  developmental concerns
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableTests.map((test) => {
                    const Icon = test.icon;
                    const completedTest = getTestCompletionStatus(test.id);
                    return (
                      <Card
                        key={test.id}
                        className="border-2 hover:border-primary/50 transition-colors"
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{test.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                {test.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{test.duration}</span>
                                </div>
                                <span>{test.ageRange}</span>
                              </div>
                              <div className="space-y-2">
                                <Button
                                  size="sm"
                                  className="w-full"
                                  onClick={() =>
                                    onTakeTest &&
                                    onTakeTest(selectedChild.id, test.id)
                                  }
                                >
                                  <Play className="w-3 h-3 mr-1" />
                                  Take Test
                                </Button>
                                {completedTest && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() =>
                                      handleViewReport(completedTest)
                                    }
                                  >
                                    <FileText className="w-3 h-3 mr-1" />
                                    View Report
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> All tests should be taken under
                    supervision of a parent or teacher. These assessments are
                    for screening purposes only and do not replace professional
                    medical evaluation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle>Allergies & Medical Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChild.allergies && selectedChild.allergies.length > 0 ? (
                  <div className="space-y-3">
                    {selectedChild.allergies.map(allergy => (
                      <div
                        key={allergy.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Shield className="w-4 h-4 text-red-500" />
                          <div>
                            <p className="font-medium">{allergy.allergy}</p>
                            <p className="text-xs text-muted-foreground">
                              {allergy.type}
                            </p>
                          </div>
                        </div>
                        {getSeverityBadge(allergy.severity)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No allergies recorded</p>
                  </div>
                )}
                <div className="mt-4">
                  <Button onClick={() => setShowAddAllergy(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Allergy
                  </Button>
                  <Dialog open={showAddAllergy} onOpenChange={setShowAddAllergy}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Allergy</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="allergy-name">Allergy Name</Label>
                          <Input
                            id="allergy-name"
                            value={newAllergy.allergy}
                            onChange={e => setNewAllergy({ ...newAllergy, allergy: e.target.value })}
                            placeholder="Allergy name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="allergy-type">Type</Label>
                          <Select 
                            value={newAllergy.type} 
                            onValueChange={val => setNewAllergy({ ...newAllergy, type: val })}
                          >
                            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="food">Food</SelectItem>
                              <SelectItem value="environment">Environment</SelectItem>
                              <SelectItem value="medication">Medication</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-3">
                          <Button onClick={handleAddAllergy} className="flex-1">
                            Save
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowAddAllergy(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Tabs defaultValue="vision" className="space-y-4">
              <TabsList>
                <TabsTrigger value="vision">Vision Reports</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
              </TabsList>

              <TabsContent value="vision">
                <Card>
                  <CardHeader>
                    <CardTitle>Vision Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Left Eye</TableHead>
                          <TableHead>Right Eye</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(selectedChild.visionReports || []).map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>{report.leftEye}</TableCell>
                            <TableCell>{report.rightEye}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  report.status === "Normal"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vaccinations">
                <Card>
                  <CardHeader>
                    <CardTitle>Vaccination Records</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vaccine</TableHead>
                          <TableHead>Last Dose</TableHead>
                          <TableHead>Next Due</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(selectedChild.vaccinations || []).map((vaccine) => (
                          <TableRow key={vaccine.id}>
                            <TableCell>{vaccine.vaccine}</TableCell>
                            <TableCell>{vaccine.date}</TableCell>
                            <TableCell>{vaccine.nextDue}</TableCell>
                            <TableCell>
                              {getStatusBadge(vaccine.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Health Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={editHealthData.height}
                    onChange={e => setEditHealthData({ ...editHealthData, height: e.target.value })}
                    placeholder="Enter height in cm"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={editHealthData.weight}
                    onChange={e => setEditHealthData({ ...editHealthData, weight: e.target.value })}
                    placeholder="Enter weight in kg"
                  />
                </div>
                <div>
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <Select
                    value={editHealthData.blood_type}
                    onValueChange={value => setEditHealthData({ ...editHealthData, blood_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveHealthData}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Health Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Development Progress</CardTitle>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(selectedChild.assessments || []).map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{assessment.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {assessment.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {assessment.score}%
                          </p>
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Completed Tests */}
            {(selectedChild.completedTests || []).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Completed Assessment Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(selectedChild.completedTests || []).map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{test.testName}</h4>
                          <p className="text-sm text-muted-foreground">
                            Completed on {test.date}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">
                              Score: {test.score}%
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(test)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Report
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Individual Reports</h2>
                <p className="text-sm text-muted-foreground">
                  Comprehensive reports for {selectedChild.name}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>

            {/* Report Filters */}
            <div className="flex flex-wrap gap-2">
              {["all", "health", "development", "vision", "behavioral"].map(
                (filter) => (
                  <Button
                    key={filter}
                    variant={
                      activeReportFilter === filter ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveReportFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                )
              )}
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(filteredReports || []).map((report) => (
                <Card
                  key={report.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{report.type}</CardTitle>
                      <Badge
                        variant={
                          report.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.date}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{report.summary}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Child Dialog */}
        <Dialog open={isEditingChild} onOpenChange={setIsEditingChild}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Child Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editChild.name}
                  onChange={(e) =>
                    setEditChild({ ...editChild, name: e.target.value })
                  }
                  placeholder="Enter child's name"
                />
              </div>
              <div>
                <Label htmlFor="edit-birthDate">Birth Date</Label>
                <Input
                  id="edit-birthDate"
                  type="date"
                  value={editChild.date_of_birth}
                  onChange={(e) =>
                    setEditChild({ ...editChild, date_of_birth: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-gender">Gender</Label>
                <Select
                  value={editChild.gender}
                  onValueChange={(value) =>
                    setEditChild({ ...editChild, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editChild.address}
                  onChange={(e) =>
                    setEditChild({ ...editChild, address: e.target.value })
                  }
                  placeholder="Enter address"
                />
              </div>
              <div>
                <Label htmlFor="edit-contact">Contact Number</Label>
                <Input
                  id="edit-contact"
                  type="tel"
                  value={editChild.contact}
                  onChange={(e) =>
                    setEditChild({ ...editChild, contact: e.target.value })
                  }
                  placeholder="Enter contact number"
                />
              </div>
              <div>
                <Label htmlFor="edit-parentEmail">Parent Email</Label>
                <Input
                  id="edit-parentEmail"
                  type="email"
                  value={editChild.parent_email}
                  onChange={(e) =>
                    setEditChild({ ...editChild, parent_email: e.target.value })
                  }
                  placeholder="Enter parent email"
                />
              </div>
              <div>
                <Label htmlFor="edit-height">Height (cm)</Label>
                <Input
                  id="edit-height"
                  type="number"
                  value={editHealthData.height}
                  onChange={e =>
                    setEditHealthData({ ...editHealthData, height: e.target.value })
                  }
                  placeholder="Enter height in cm"
                />
              </div>
              <div>
                <Label htmlFor="edit-weight">Weight (kg)</Label>
                <Input
                  id="edit-weight"
                  type="number"
                  value={editHealthData.weight}
                  onChange={e =>
                    setEditHealthData({ ...editHealthData, weight: e.target.value })
                  }
                  placeholder="Enter weight in kg"
                />
              </div>
              <div>
                <Label htmlFor="edit-bloodType">Blood Type</Label>
                <Select
                  value={editHealthData.blood_type}
                  onValueChange={value =>
                    setEditHealthData({ ...editHealthData, blood_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleSaveAll} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Update Details
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingChild(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Report Dialog */}
        <Dialog
          open={!!viewingReport}
          onOpenChange={() => setViewingReport(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{viewingReport?.testName} Report</DialogTitle>
            </DialogHeader>
            {viewingReport && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Child Name</p>
                    <p className="font-medium">{selectedChild?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Test Date</p>
                    <p className="font-medium">{viewingReport.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="font-medium">{viewingReport.score}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-green-100 text-green-800">
                      {viewingReport.status.charAt(0).toUpperCase() +
                        viewingReport.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Test Results</h3>
                  <div className="p-4 bg-muted rounded-lg">
                    <p>{viewingReport.result}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm">
                      Continue regular monitoring and follow up with healthcare
                      provider if any concerns arise. Maintain regular check-ups
                      and ensure proper vision care.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleExportReport(viewingReport)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setViewingReport(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Test Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableTests.map(test => {
                  const result = getTestResultForType(test.id);
                  return (
                    <TableRow key={test.id}>
                      <TableCell>{test.name}</TableCell>
                      <TableCell>
                        {result ? "Completed" : "Pending"}
                      </TableCell>
                      <TableCell>
                        {result ? result.result : "-"}
                      </TableCell>
                      <TableCell>
                        {result ? (result.updated_at ? result.updated_at.split("T")[0] : "-") : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show children list when no child is selected
  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1></h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your children's health information
          </p>
        </div>
        <Button onClick={() => setIsAddingChild(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Child
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(students || []).map((child) => (
          <Card
            key={child.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleSelectChild(child.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age: {child.age ? child.age : 8}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditChild(child);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChild(child.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last checkup:</span>
                  <span>
                    {child.lastCheckup ? child.lastCheckup : "27/03/24"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      child?.status === "healthy" ? "default" : "destructive"
                    }
                  >
                    {child?.status === "healthy"
                      ? "Healthy"
                      : "Needs Attention"}
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onViewChild(child.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Child Dialog */}
      <Dialog open={isAddingChild} onOpenChange={setIsAddingChild}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Child</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newChild.name}
                onChange={(e) =>
                  setNewChild({ ...newChild, name: e.target.value })
                }
                placeholder="Enter child's name"
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={newChild.date_of_birth}
                onChange={(e) =>
                  setNewChild({ ...newChild, date_of_birth: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={newChild.gender}
                onValueChange={(value) =>
                  setNewChild({ ...newChild, gender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newChild.address}
                onChange={(e) =>
                  setNewChild({ ...newChild, address: e.target.value })
                }
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                value={newChild.contact}
                onChange={(e) =>
                  setNewChild({ ...newChild, contact: e.target.value })
                }
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <Label htmlFor="parentEmail">Parent Email</Label>
              <Input
                id="parentEmail"
                type="email"
                value={newChild.parent_email}
                onChange={(e) =>
                  setNewChild({ ...newChild, parent_email: e.target.value })
                }
                placeholder="Enter parent email"
              />
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleAddChild} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Add Child
              </Button>
              <Button variant="outline" onClick={() => setIsAddingChild(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Child Dialog */}
      <Dialog open={isEditingChild} onOpenChange={setIsEditingChild}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Child Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editChild.name}
                onChange={(e) =>
                  setEditChild({ ...editChild, name: e.target.value })
                }
                placeholder="Enter child's name"
              />
            </div>
            <div>
              <Label htmlFor="edit-birthDate">Birth Date</Label>
              <Input
                id="edit-birthDate"
                type="date"
                value={editChild.date_of_birth}
                onChange={(e) =>
                  setEditChild({ ...editChild, date_of_birth: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-gender">Gender</Label>
              <Select
                value={editChild.gender}
                onValueChange={(value) =>
                  setEditChild({ ...editChild, gender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={editChild.address}
                onChange={(e) =>
                  setEditChild({ ...editChild, address: e.target.value })
                }
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label htmlFor="edit-contact">Contact Number</Label>
              <Input
                id="edit-contact"
                type="tel"
                value={editChild.contact}
                onChange={(e) =>
                  setEditChild({ ...editChild, contact: e.target.value })
                }
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <Label htmlFor="edit-parentEmail">Parent Email</Label>
              <Input
                id="edit-parentEmail"
                type="email"
                value={editChild.parent_email}
                onChange={(e) =>
                  setEditChild({ ...editChild, parent_email: e.target.value })
                }
                placeholder="Enter parent email"
              />
            </div>
            <div>
              <Label htmlFor="edit-height">Height (cm)</Label>
              <Input
                id="edit-height"
                type="number"
                value={editHealthData.height}
                onChange={e =>
                  setEditHealthData({ ...editHealthData, height: e.target.value })
                }
                placeholder="Enter height in cm"
              />
            </div>
            <div>
              <Label htmlFor="edit-weight">Weight (kg)</Label>
              <Input
                id="edit-weight"
                type="number"
                value={editHealthData.weight}
                onChange={e =>
                  setEditHealthData({ ...editHealthData, weight: e.target.value })
                }
                placeholder="Enter weight in kg"
              />
            </div>
            <div>
              <Label htmlFor="edit-bloodType">Blood Type</Label>
              <Select
                value={editHealthData.blood_type}
                onValueChange={value =>
                  setEditHealthData({ ...editHealthData, blood_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleSaveAll} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Update Details
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditingChild(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}