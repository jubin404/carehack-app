from django.urls import path, re_path
from .views import StudentListCreateView, StudentDetailView, ClassGroupListCreateView, ClassGroupDetailView, UserListCreateView, UserDetailView, LoginView, AllergyListCreateView, AllergyDetailView, HealthDataListCreateView, HealthDataDetailView, MedicalHistoryListCreateView, MedicalHistoryDetailView, TestsListCreateView, TestsDetailView, TestResultsListCreateView, TestResultsDetailView

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

    path('allergies/', AllergyListCreateView.as_view(), name='allergy-list-create'),
    path('allergies/<int:pk>/', AllergyDetailView.as_view(), name='allergy-detail'),

    path('healthdata/', HealthDataListCreateView.as_view(), name='healthdata-list-create'),
    path('healthdata/<int:pk>/', HealthDataDetailView.as_view(), name='healthdata-detail'),

    path('medicalhistory/', MedicalHistoryListCreateView.as_view(), name='medicalhistory-list-create'),
    path('medicalhistory/<int:pk>/', MedicalHistoryDetailView.as_view(), name='medicalhistory-detail'),

    path('tests/', TestsListCreateView.as_view(), name='tests-list-create'),
    path('tests/<int:pk>/', TestsDetailView.as_view(), name='tests-detail'),

    path('testresults/', TestResultsListCreateView.as_view(), name='testresults-list-create'),
    path('testresults/<int:pk>/', TestResultsDetailView.as_view(), name='testresults-detail'),
]
