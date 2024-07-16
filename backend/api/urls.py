from django.urls import path
from .views import NoteListCreate, NoteRetriveUpdateDestroy

urlpatterns = [
    path("notes/", NoteListCreate.as_view(), name="note-view-create"),
    path(
        "notes/<int:pk>/", NoteRetriveUpdateDestroy.as_view(), name="note-update-delete"
    ),
]
