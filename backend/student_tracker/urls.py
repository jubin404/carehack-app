from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
import rest_framework

schema_view = get_schema_view(
    openapi.Info(
        title="Student Health Tracker API",
        default_version="v1",
    ),
    public=True,
    permission_classes=[rest_framework.permissions.AllowAny],
    url=None,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path('api/', include('tracker.urls')),
]

