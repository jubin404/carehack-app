from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import Student, ClassGroup, User
from .serializers import StudentSerializer, ClassGroupSerializer, UserSerializer, LoginSerializer
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
        request.session.set_expiry(60 * 120)

        return Response({"message": "Login successful", "email": user.email})



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
            students = Student.objects.filter(class_group__teacher=user)
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
