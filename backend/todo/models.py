from django.db import models
from userauth.models import User

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, null=True, related_name="todos", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
