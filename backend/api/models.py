from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Post: {self.title}"
