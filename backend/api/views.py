from rest_framework import generics

# from rest_framework import ModelViewSet
from .models import Note
from .serializers import NoteSerializer


# NoteListCreate is a view that will list all the notes and create a new note
class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


# NoteRetriveUpdateDestroy is a view that will retrieve, update and delete a note
class NoteRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = "pk"
