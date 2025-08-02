from rest_framework.authentication import BaseAuthentication
from django.contrib.sessions.models import Session
from ..models import User
from django.utils.timezone import now

class CustomSessionAuthentication(BaseAuthentication):
    def authenticate(self, request):
        user_id = request.session.get("user_id")
        if not user_id:
            return None

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

        user.is_authenticated = True
        return (user, None)
