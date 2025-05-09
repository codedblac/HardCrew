from django.urls import path
from . import views

urlpatterns = [
    # List and create posts
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),

    # Like/unlike a post
    path('posts/<int:post_id>/like/', views.like_post, name='post-like'),

    # Add a comment to a post
    path('posts/<int:post_id>/comment/', views.create_comment, name='post-comment'),

    # List comments for a post
    path('posts/<int:post_id>/comments/', views.CommentListView.as_view(), name='post-comments'),

    # Delete a specific comment
    path('comments/<int:comment_id>/delete/', views.delete_comment, name='delete-comment'),
]
