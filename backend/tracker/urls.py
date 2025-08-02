from django.urls import path, re_path
from .views import StudentListCreateView, StudentDetailView, ClassGroupListCreateView, ClassGroupDetailView, UserListCreateView, UserDetailView, LoginView

urlpatterns = [
    # Student endpoints
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),
    # Class endpoints
    path('classes/', ClassGroupListCreateView.as_view(), name='class-list-create'),
    path('classes/<int:pk>/', ClassGroupDetailView.as_view(), name='class-detail'),
    # User endpoints
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),

    path('login/', LoginView.as_view(), name='login'),
]
