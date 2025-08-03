import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye,
  Brain,
  FileText,
  Download
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface TestTakingProps {
  childId: number | null;
  testType: string | null;
  onBackToProfile: () => void;
}

interface TestQuestion {
  id: number;
  type: 'color-blindness' | 'visual-acuity' | 'adhd-screening';
  question: string;
  options?: string[];
  imageUrl?: string;
  correctAnswer?: number;
}

interface TestResult {
  testType: string;
  testName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completionTime: number;
  result: string;
  recommendations: string[];
}

const testQuestions: Record<string, TestQuestion[]> = {
  'color-blindness': [
    {
      id: 1,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 5,
      imageUrl: '/cb10.png'
    },
    {
      id: 2,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 7,
      imageUrl: '/cb11.png'
    },
    {
      id: 3,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 2,
      imageUrl: '/cb12.png'
    },
    {
      id: 4,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 6,
      imageUrl: '/cb13.png'
    },
    {
      id: 5,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 2,
      imageUrl: '/cb14.png'
    },
    {
      id: 6,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 7,
      imageUrl: '/cb15.png'
    },
    {
      id: 7,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 6,
      imageUrl: '/cb16.png'
    },
    {
      id: 8,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 7,
      imageUrl: '/cb17.png'
    },
    {
      id: 9,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 6,
      imageUrl: '/cb18.png'
    },
    {
      id: 10,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer:7,
      imageUrl: '/cb19.png'
    },
    {
      id: 11,
      type: 'color-blindness',
      question: 'What number do you see in this circle?',
      options: ['1', '2', '3','4','5','6','7','8','9', "I can't see any number"],
      correctAnswer: 2,
      imageUrl: '/cb20.png'
    }
  ],
  'visual-acuity': [
    {
      id: 1,
      type: 'visual-acuity',
      question: 'Which direction is the letter E pointing?',
      options: ['Left', 'Right', 'Up', 'Down'],
      correctAnswer: 1
    },
    {
      id: 2,
      type: 'visual-acuity',
      question: 'Which direction is the letter E pointing?',
      options: ['Left', 'Right', 'Up', 'Down'],
      correctAnswer: 0
    },
    {
      id: 3,
      type: 'visual-acuity',
      question: 'Which direction is the letter E pointing?',
      options: ['Left', 'Right', 'Up', 'Down'],
      correctAnswer: 3
    },
    {
      id: 4,
      type: 'visual-acuity',
      question: 'Which direction is the letter E pointing?',
      options: ['Left', 'Right', 'Up', 'Down'],
      correctAnswer: 2
    },
    {
      id: 5,
      type: 'visual-acuity',
      question: 'Which direction is the letter E pointing?',
      options: ['Left', 'Right', 'Up', 'Down'],
      correctAnswer: 1
    }
  ],
  'adhd-screening': [
    {
      id: 1,
      type: 'adhd-screening',
      question: 'How often does the child have trouble keeping attention on tasks or play activities?',
      options: ['Never', 'Sometimes', 'Often', 'Very Often']
    },
    {
      id: 2,
      type: 'adhd-screening',
      question: 'How often does the child have trouble organizing tasks and activities?',
      options: ['Never', 'Sometimes', 'Often', 'Very Often']
    },
    {
      id: 3,
      type: 'adhd-screening',
      question: 'How often does the child fidget with hands or feet or squirm in seat?',
      options: ['Never', 'Sometimes', 'Often', 'Very Often']
    },
    {
      id: 4,
      type: 'adhd-screening',
      question: 'How often does the child interrupt or intrude on others?',
      options: ['Never', 'Sometimes', 'Often', 'Very Often']
    },
    {
      id: 5,
      type: 'adhd-screening',
      question: 'How often does the child have difficulty waiting their turn?',
      options: ['Never', 'Sometimes', 'Often', 'Very Often']
    }
  ]
};

const testInfo = {
  'color-blindness': {
    name: 'Color Vision Test',
    description: 'This test screens for color blindness using Ishihara plates',
    icon: Eye,
    instructions: 'Look at each image carefully and select the number you see in the colored dots.'
  },
  'visual-acuity': {
    name: 'Visual Acuity Test',
    description: 'This test measures the clarity of your vision',
    icon: Eye,
    instructions: 'Look at each letter E and select the direction it is pointing.'
  },
  'adhd-screening': {
    name: 'ADHD Screening',
    description: 'This screening helps identify potential attention and hyperactivity concerns',
    icon: Brain,
    instructions: 'Answer each question based on your observations of the child\'s behavior.'
  }
};

export function TestTaking({ childId, testType, onBackToProfile }: TestTakingProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const questions = testType ? testQuestions[testType] || [] : [];
  const info = testType ? testInfo[testType as keyof typeof testInfo] : null;

  useEffect(() => {
    if (!showInstructions && !isCompleted) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showInstructions, isCompleted]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = async(finalAnswers: number[]) => {
    let correctAnswers = 0;
    let score = 0;

    if (testType === 'color-blindness' || testType === 'visual-acuity') {
      console.log(finalAnswers, questions);
      correctAnswers = finalAnswers.filter((answer, index) =>
        answer === questions[index].correctAnswer
      ).length;
      score = Math.round((correctAnswers / questions.length) * 100);
    } else if (testType === 'adhd-screening') {
      const totalScore = finalAnswers.reduce((sum, answer) => sum + answer, 0);
      const maxScore = questions.length * 3;
      score = Math.round(((maxScore - totalScore) / maxScore) * 100);
      correctAnswers = questions.length - Math.floor(totalScore / 2);
    }

    const result: TestResult = {
      testType: testType!,
      testName: info?.name || '',
      score,
      totalQuestions: questions.length,
      correctAnswers,
      completionTime: timeElapsed,
      result: generateResultText(testType!, score),
      recommendations: generateRecommendations(testType!, score)
    };
    
     try {
      const response = await fetch(
        `http://localhost:8000/api/testresults/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              
              test: testType,
              result: score,
              student: childId
            }
          ),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error updating student:", error);
    }
    setTestResult(result);
    setIsCompleted(true);
  };

  const generateResultText = (type: string, score: number): string => {
    switch (type) {
      case 'color-blindness':
        if (score >= 80) return 'Normal color vision detected. No signs of color blindness.';
        if (score >= 60) return 'Mild color vision deficiency may be present. Consider professional evaluation.';
        return 'Color vision deficiency detected. Professional evaluation recommended.';
      
      case 'visual-acuity':
        if (score >= 90) return 'Excellent visual acuity. 20/20 vision or better.';
        if (score >= 70) return 'Good visual acuity with minor concerns.';
        return 'Visual acuity concerns detected. Eye examination recommended.';
      
      case 'adhd-screening':
        if (score >= 80) return 'Low likelihood of ADHD-related concerns.';
        if (score >= 60) return 'Some attention or hyperactivity concerns noted. Monitoring recommended.';
        return 'Significant attention or hyperactivity concerns detected. Professional evaluation recommended.';
      
      default:
        return 'Test completed successfully.';
    }
  };

  const generateRecommendations = (type: string, score: number): string[] => {
    const common = [
      'Share these results with your healthcare provider',
      'Schedule regular check-ups as recommended',
      'Monitor any changes in symptoms or behavior'
    ];

    switch (type) {
      case 'color-blindness':
        if (score < 80) {
          return [
            'Consult with an eye care professional for comprehensive color vision testing',
            'Inform teachers about potential color vision differences',
            'Consider alternative teaching methods that don\'t rely solely on color',
            ...common
          ];
        }
        return ['Continue regular eye examinations', ...common];
      
      case 'visual-acuity':
        if (score < 80) {
          return [
            'Schedule a comprehensive eye examination',
            'Ensure proper lighting when reading or studying',
            'Limit screen time and take regular breaks',
            ...common
          ];
        }
        return ['Maintain good eye health habits', ...common];
      
      case 'adhd-screening':
        if (score < 70) {
          return [
            'Consider consultation with a pediatric psychologist or psychiatrist',
            'Implement structured routines and clear expectations',
            'Provide frequent breaks during focused activities',
            'Consider classroom accommodations if needed',
            ...common
          ];
        }
        return ['Continue supportive parenting strategies', ...common];
      
      default:
        return common;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExportReport = () => {
    // Here you would export the report
    console.log('Exporting report:', testResult);
    alert('Report would be exported as PDF in a real application');
  };

  if (!testType || !info) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Invalid test type. Please go back and select a valid test.
            </AlertDescription>
          </Alert>
          <Button onClick={onBackToProfile} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  if (showInstructions) {
    const Icon = info.icon;
    return (
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Button variant="outline" onClick={onBackToProfile} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle>{info.name}</CardTitle>
              <p className="text-muted-foreground">{info.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> This test should be taken under supervision of a parent or teacher. 
                  This assessment is for screening purposes only and does not replace professional medical evaluation.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <p className="text-muted-foreground">{info.instructions}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="ml-2">{questions.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Estimated time:</span>
                  <span className="ml-2">5-10 minutes</span>
                </div>
              </div>

              <Button 
                onClick={() => setShowInstructions(false)} 
                className="w-full"
                size="lg"
              >
                Start Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isCompleted && testResult) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Button variant="outline" onClick={onBackToProfile} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle>Test Completed Successfully!</CardTitle>
              <p className="text-muted-foreground">
                {testResult.testName} has been completed
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{testResult.score}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{formatTime(testResult.completionTime)}</p>
                  <p className="text-sm text-muted-foreground">Time</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Test Results</h3>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p>{testResult.result}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recommendations</h3>
                <div className="space-y-2">
                  {testResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Disclaimer:</strong> This is a screening tool only. Please consult with a healthcare 
                  professional for proper diagnosis and treatment recommendations.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-3">
                <Button onClick={handleExportReport} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" onClick={onBackToProfile} className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  View in Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBackToProfile}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Question {currentQuestion + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQ.imageUrl && (
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={currentQ.imageUrl} 
                    alt="Test Plate" 
                    className="max-w-full max-h-full object-contain bg-black"
                  />
                </div>  
              </div>
            )}

            <div className="text-center">
              <h3 className="text-lg mb-4">{currentQ.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options?.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4 text-left"
                  onClick={() => handleAnswer(index+1)}
                >
                  <span className="w-6 h-6 rounded-full border-2 border-primary mr-3 flex-shrink-0 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}