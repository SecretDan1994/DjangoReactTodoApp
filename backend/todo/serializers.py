from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False)

    class Meta:
        model = Todo
        fields = '__all__'

    def create(self, validated_data):
        todo, todo_created = Todo.objects.get_or_create(title=validated_data.get('title'))
        todo.__dict__.update(**validated_data)
        todo.save()

        if todo_created:
            todo_created_msg = f"Created Todo object: {validated_data}"

        else:
            todo_created_msg = f"Updated Todo object: {validated_data}"

        return todo, todo_created_msg