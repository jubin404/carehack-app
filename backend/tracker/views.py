from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import generics

from .models import Student, ClassGroup, User, Allergy, HealthData, MedicalHistory, Tests, TestResults
from .serializers import StudentSerializer, ClassGroupSerializer, UserSerializer, LoginSerializer, AllergySerializer, HealthDataSerializer, MedicalHistorySerializer, TestsSerializer, TestResultsSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny 

# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth.models import update_last_login

# -------------------------
# User Views
# -------------------------
class UserListCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200: UserSerializer(many=True)})
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=UserSerializer, responses={201: UserSerializer})
    def post(self, request):
        data = request.data.copy()
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User created successfully", "user_id": user.id},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    permission_classes = [AllowAny]

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    @swagger_auto_schema(
        operation_summary="Retrieve user",
        responses={200: UserSerializer}
    )
    def get(self, request, pk):
        user = self.get_user(pk)
        if not user:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin' and request.user.pk != user.pk:
            return Response({"detail": "Forbidden"}, status=403)

        serializer = UserSerializer(user)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Update user",
        request_body=UserSerializer,
        responses={200: UserSerializer}
    )
    def put(self, request, pk):
        user = self.get_user(pk)
        if not user:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin' and request.user.pk != user.pk:
            return Response({"detail": "Only admins or the user themselves can update this record."}, status=403)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @swagger_auto_schema(
        operation_summary="Delete user",
        responses={204: "No Content"}
    )
    def delete(self, request, pk):
        user = self.get_user(pk)
        if not user:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin':
            return Response({"detail": "Only admins can delete users."}, status=403)

        user.delete()
        return Response(status=204)


# -------------------------
# Class Views
# -------------------------
class ClassGroupListCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(responses={200: ClassGroupSerializer(many=True)})
    def get(self, request):
        user = request.user
        if user.role == 'admin':
            classes = ClassGroup.objects.all()
        elif user.role == 'teacher':
            classes = ClassGroup.objects.filter(teacher=user)
        else:
            return Response({"detail": "Forbidden"}, status=403)

        return Response(ClassGroupSerializer(classes, many=True).data)

    @swagger_auto_schema(request_body=ClassGroupSerializer, responses={201: ClassGroupSerializer})
    def post(self, request):
        if request.user.role != 'admin':
            return Response({"detail": "Only admins can create classes."}, status=403)
        serializer = ClassGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ClassGroupDetailView(APIView):
    permission_classes = [AllowAny]

    def get_class(self, pk):
        try:
            return ClassGroup.objects.get(pk=pk)
        except ClassGroup.DoesNotExist:
            return None

    @swagger_auto_schema(
        operation_summary="Retrieve class group",
        responses={200: ClassGroupSerializer}
    )
    def get(self, request, pk):
        class_group = self.get_class(pk)
        if not class_group:
            return Response({"detail": "Not found"}, status=404)

        user = request.user
        if user.role != 'admin' and (user.role != 'teacher' or class_group.teacher != user):
            return Response({"detail": "Forbidden"}, status=403)

        serializer = ClassGroupSerializer(class_group)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Update class group",
        request_body=ClassGroupSerializer,
        responses={200: ClassGroupSerializer}
    )
    def put(self, request, pk):
        class_group = self.get_class(pk)
        if not class_group:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin':
            return Response({"detail": "Only admins can update class groups."}, status=403)

        serializer = ClassGroupSerializer(class_group, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @swagger_auto_schema(
        operation_summary="Delete class group",
        responses={204: "No Content"}
    )
    def delete(self, request, pk):
        class_group = self.get_class(pk)
        if not class_group:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin':
            return Response({"detail": "Only admins can delete class groups."}, status=403)

        class_group.delete()
        return Response(status=204)



# -------------------------
# Auth Views
# -------------------------
# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     @swagger_auto_schema(request_body=RegisterSerializer, responses={201: UserSerializer})
#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(UserSerializer(user).data, status=201)
#         return Response(serializer.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
            if not check_password(password, user.password):
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        request.session['user_id'] = user.id
        request.session['email'] = user.email
        request.session['name'] = user.name
        request.session['role'] = user.role
        request.session.set_expiry(60 * 120)

        return Response({"message": "Login successful","user_id":user.id, "email": user.email, "name": user.name, "role": user.role})



# -------------------------
# Student List + Create
# -------------------------
class StudentListCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List students",
        operation_description="List students accessible to the logged-in user based on role.",
        responses={200: StudentSerializer(many=True)}
    )
    def get(self, request):
        user = request.user
        if user.role == 'admin':
            students = Student.objects.all()
        elif user.role == 'teacher':
            students = Student.objects.filter(class_group__teachers=user)
        elif user.role == 'parent':
            students = Student.objects.filter(parent_email=user.email)
        else:
            students = Student.objects.none()

        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Create student",
        operation_description="Create a new student. Only admins are allowed to perform this.",
        request_body=StudentSerializer,
        responses={201: StudentSerializer}
    )
    def post(self, request):
        user = request.user
        # if user.role != 'admin':
        #     return Response({"detail": "Only admins can create students."}, status=403)

        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# -------------------------
# Student Retrieve/Update/Delete
# -------------------------
class StudentDetailView(APIView):
    permission_classes = [AllowAny]

    def get_student(self, pk):
        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return None

    @swagger_auto_schema(
        operation_summary="Retrieve student",
        responses={200: StudentSerializer}
    )
    def get(self, request, pk):
        student = self.get_student(pk)
        if not student:
            return Response({"detail": "Not found"}, status=404)

        user = request.user
        if user.role == 'admin':
            pass
        elif user.role == 'teacher' and student.class_group.teacher != user:
            return Response({"detail": "Forbidden"}, status=403)
        elif user.role == 'parent' and student.parent_email != user.email:
            return Response({"detail": "Forbidden"}, status=403)

        serializer = StudentSerializer(student)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Update student",
        request_body=StudentSerializer,
        responses={200: StudentSerializer}
    )
    def put(self, request, pk):
        student = self.get_student(pk)
        if not student:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin':
            return Response({"detail": "Only admins can update students."}, status=403)

        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @swagger_auto_schema(
        operation_summary="Delete student",
        responses={204: "No Content"}
    )
    def delete(self, request, pk):
        student = self.get_student(pk)
        if not student:
            return Response({"detail": "Not found"}, status=404)

        if request.user.role != 'admin':
            return Response({"detail": "Only admins can delete students."}, status=403)

        student.delete()
        return Response(status=204)


class AllergyListCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        allergies = Allergy.objects.all()
        serializer = AllergySerializer(allergies, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=AllergySerializer, responses={201: AllergySerializer})
    def post(self, request):
        serializer = AllergySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllergyDetailView(APIView):
    permission_classes = [AllowAny]
    def get_object(self, pk):
        try:
            return Allergy.objects.get(pk=pk)
        except Allergy.DoesNotExist:
            return None

    def get(self, request, pk):
        allergy = self.get_object(pk)
        if not allergy:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AllergySerializer(allergy)
        return Response(serializer.data)

    def put(self, request, pk):
        allergy = self.get_object(pk)
        if not allergy:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AllergySerializer(allergy, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        allergy = self.get_object(pk)
        if not allergy:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        allergy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class HealthDataListCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List health data",
        operation_description="Retrieve all health data or filter by student ID.",
        responses={200: HealthDataSerializer(many=True)}
    )
    def get(self, request):
        student_id = request.GET.get('student')
        if student_id:
            healthdata = HealthData.objects.filter(student_id=student_id)
        else:
            healthdata = HealthData.objects.all()
        serializer = HealthDataSerializer(healthdata, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Create health data",
        request_body=HealthDataSerializer,
        responses={201: HealthDataSerializer}
    )
    def post(self, request):
        serializer = HealthDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HealthDataDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return HealthData.objects.get(pk=pk)
        except HealthData.DoesNotExist:
            return None

    @swagger_auto_schema(
        operation_summary="Retrieve health data",
        responses={200: HealthDataSerializer}
    )
    def get(self, request, pk):
        healthdata = self.get_object(pk)
        if not healthdata:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = HealthDataSerializer(healthdata)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Update health data",
        request_body=HealthDataSerializer,
        responses={200: HealthDataSerializer}
    )
    def put(self, request, pk):
        healthdata = self.get_object(pk)
        if not healthdata:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = HealthDataSerializer(healthdata, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Partially update health data",
        request_body=HealthDataSerializer,
        responses={200: HealthDataSerializer}
    )
    def patch(self, request, pk):
        healthdata = self.get_object(pk)
        if not healthdata:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = HealthDataSerializer(healthdata, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Delete health data",
        responses={204: "No Content"}
    )
    def delete(self, request, pk):
        healthdata = self.get_object(pk)
        if not healthdata:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        healthdata.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# MedicalHistory Views
class MedicalHistoryListCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List medical history",
        operation_description="Retrieve all medical history or filter by student ID.",
        responses={200: MedicalHistorySerializer(many=True)}
    )
    def get(self, request):
        student_id = request.GET.get('student')
        if student_id:
            histories = MedicalHistory.objects.filter(student_id=student_id)
        else:
            histories = MedicalHistory.objects.all()
        serializer = MedicalHistorySerializer(histories, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Create medical history",
        request_body=MedicalHistorySerializer,
        responses={201: MedicalHistorySerializer}
    )
    def post(self, request):
        serializer = MedicalHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedicalHistoryDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return MedicalHistory.objects.get(pk=pk)
        except MedicalHistory.DoesNotExist:
            return None

    @swagger_auto_schema(
        operation_summary="Retrieve medical history",
        responses={200: MedicalHistorySerializer}
    )
    def get(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicalHistorySerializer(obj)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Update medical history",
        request_body=MedicalHistorySerializer,
        responses={200: MedicalHistorySerializer}
    )
    def put(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicalHistorySerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Partially update medical history",
        request_body=MedicalHistorySerializer,
        responses={200: MedicalHistorySerializer}
    )
    def patch(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MedicalHistorySerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Delete medical history",
        responses={204: "No Content"}
    )
    def delete(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Tests Views
class TestsListCreateView(APIView):
    def get(self, request):
        tests = Tests.objects.all()
        serializer = TestsSerializer(tests, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TestsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestsDetailView(APIView):
    def get_object(self, pk):
        try:
            return Tests.objects.get(pk=pk)
        except Tests.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestsSerializer(obj)
        return Response(serializer.data)

    def put(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestsSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TestResults Views
class TestResultsListCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="List test results",
        operation_description="Retrieve all test results or filter by student ID.",
        responses={200: TestResultsSerializer(many=True)}
    )
    def get(self, request):
        student_id = request.GET.get('student')
        if student_id:
            results = TestResults.objects.filter(student_id=student_id)
        else:
            results = TestResults.objects.all()
        serializer = TestResultsSerializer(results, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Create test result",
        request_body=TestResultsSerializer,
        responses={201: TestResultsSerializer}
    )
    def post(self, request):
        serializer = TestResultsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestResultsDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return TestResults.objects.get(pk=pk)
        except TestResults.DoesNotExist:
            return None

    @swagger_auto_schema(
        operation_summary="Retrieve test result",
        responses={200: TestResultsSerializer}
    )
    def get(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestResultsSerializer(obj)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_summary="Update test result",
        request_body=TestResultsSerializer,
        responses={200: TestResultsSerializer}
    )
    def put(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestResultsSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Partially update test result",
        request_body=TestResultsSerializer,
        responses={200: TestResultsSerializer}
    )
    def patch(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestResultsSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Delete test result",
        responses={204: "No Content"}
    )
    def delete(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)