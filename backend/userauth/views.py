from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from api.renderers import MyJSONRenderer
from .models import User

class UserApiView(ModelViewSet):
    renderer_classes = [MyJSONRenderer]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user_keys = ['email', 'first_name', 'last_name', 'password']
        email, first_name, last_name, password = [request.data.get(user_key) for user_key in user_keys]

        message = None
        if not email:
            message = "Please provide email."
        if not first_name:
            message = "Please provide first name."
        if not last_name:
            message = "Please provide last name."

        if not email or not first_name or not last_name:
            return Response({"reason": message}, status=status.HTTP_400_BAD_REQUEST)

        existing_user = User.objects.filter(email=email)
        if existing_user:
            message = f"This email already has an account, please login."
            return Response({"reason": message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            user_data = {
                "email": email.lower(),
                "first_name": first_name,
                "last_name": last_name,
            }

            user = User.objects.create(**user_data)
            user.set_password(password)
            user.save()

            return Response(data=user_data, status=status.HTTP_200_OK)
