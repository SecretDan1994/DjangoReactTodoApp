import traceback
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.renderers import MyJSONRenderer
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    renderer_classes = [MyJSONRenderer]
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def list(self, request, *args, **kwargs):
        """
        Get the all the todo objects or specific todo objects specified by the data.

        Returns:
            Response: The response containing the shipment data.
        """
        try:
            if request.GET:
                serializer = self.get_serializer(data=request.GET)
                serializer.is_valid(raise_exception=True)
                serializer = self.get_serializer(self.get_queryset().filter(title=serializer.data.get('title')), many=True)
            else:
                serializer = self.get_serializer(self.get_queryset(), many=True)
            return Response(data=serializer.data,
                            status=status.HTTP_200_OK)

        except Exception as e:
            print(traceback.format_exc())
            return Response({"reason": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request, *args, **kwargs):
        """
        Create purchase order.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            todo, todo_created_msg = serializer.save()

            return Response(
                data={"message": todo_created_msg},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            print(traceback.format_exc())
            return Response({"reason": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)