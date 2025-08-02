import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Heart,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  UserCheck,
} from "lucide-react";

export function SignUp({onSwitchToLogin}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.role) {
        newErrors.role = "Please select your role";
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else {
        if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(formData.password)) {
          newErrors.password =
            "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(formData.password)) {
          newErrors.password = "Password must contain at least one number";
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the Terms of Service";
      }
      if (!formData.agreeToPrivacy) {
        newErrors.agreeToPrivacy = "You must agree to the Privacy Policy";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create account");
      }
      onSwitchToLogin();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const stepTitles = [
    "Personal Information",
    "Account Security",
    "Complete Setup",
  ];

  const stepDescriptions = [
    "Tell us about yourself",
    "Secure your account",
    "Review and agree",
  ];

  const stepHeadings = [
    "Let's Get to Know You",
    "Secure Your Account",
    "Almost Done!",
  ];

  const stepSubheadings = [
    "Enter your basic information to get started",
    "Create a strong password to protect your account",
    "Review your information and agree to our terms",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-100" />
        </div>

        {/* Signup Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardContent className="pt-8">
            {/* Logo and Welcome Text Inside Card */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Join EduCare today</p>
            </div>

            {/* Step Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {stepTitles[currentStep - 1]}
              </h2>
              <p className="text-sm text-gray-600">
                {stepDescriptions[currentStep - 1]}
              </p>
            </div>

            {/* Internal Step Heading */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stepHeadings[currentStep - 1]}
              </h3>
              <p className="text-sm text-gray-600">
                {stepSubheadings[currentStep - 1]}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className={`pl-10 h-11 border-gray-200 focus:border-gray-900 ${
                          errors.name
                            ? "border-red-300 focus:border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
                        className={`pl-10 h-11 border-gray-200 focus:border-gray-900 ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="text-sm font-medium text-gray-700"
                    >
                      Role
                    </Label>
                    <div className="relative">
                      <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <Select
                        value={formData.role}
                        onValueChange={(value) => updateFormData("role", value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          className={`pl-10 h-11 border-gray-200 focus:border-gray-900 ${
                            errors.role
                              ? "border-red-300 focus:border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">
                            Parent/Guardian
                          </SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.role && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.role}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Account Security */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          updateFormData("password", e.target.value)
                        }
                        className={`pl-10 pr-10 h-11 border-gray-200 focus:border-gray-900 ${
                          errors.password
                            ? "border-red-300 focus:border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          updateFormData("confirmPassword", e.target.value)
                        }
                        className={`pl-10 pr-10 h-11 border-gray-200 focus:border-gray-900 ${
                          errors.confirmPassword
                            ? "border-red-300 focus:border-red-500"
                            : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Password Requirements:
                    </p>
                    <div className="space-y-1">
                      <div
                        className={`flex items-center space-x-2 text-sm ${
                          formData.password.length >= 8
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>At least 8 characters</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 text-sm ${
                          /[A-Z]/.test(formData.password)
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>One uppercase letter</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 text-sm ${
                          /[0-9]/.test(formData.password)
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>One number</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Complete Setup */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  {/* Account Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-gray-900">
                      Account Summary
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {formData.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {formData.email}
                      </p>
                      <p>
                        <span className="font-medium">Role:</span>{" "}
                        {formData.role === "parent"
                          ? "Parent/Guardian"
                          : "Teacher"}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          updateFormData("agreeToTerms", checked)
                        }
                        disabled={isLoading}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          I agree to the{" "}
                          <button
                            type="button"
                            className="text-gray-900 hover:text-gray-700 font-medium"
                          >
                            Terms of Service
                          </button>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.agreeToTerms}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={formData.agreeToPrivacy}
                        onCheckedChange={(checked) =>
                          updateFormData("agreeToPrivacy", checked)
                        }
                        disabled={isLoading}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="privacy"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          I agree to the{" "}
                          <button
                            type="button"
                            className="text-gray-900 hover:text-gray-700 font-medium"
                          >
                            Privacy Policy
                          </button>
                        </label>
                        {errors.agreeToPrivacy && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.agreeToPrivacy}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {errors.submit && (
                    <Alert
                      variant="destructive"
                      className="border-red-200 bg-red-50"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-800">
                        {errors.submit}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-100">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="px-6"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onSwitchToLogin}
                    className="px-6"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="px-6 bg-black hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 bg-black hover:bg-gray-800"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-8 text-xs text-gray-500">
              <p>© 2025 EduCare. Secure & HIPAA Compliant.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
