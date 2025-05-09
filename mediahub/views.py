from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer


# List and Create Posts
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


# Like or Unlike a Post
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    like, created = Like.objects.get_or_create(user=user, post=post)
    if not created:
        like.delete()
        return Response({"detail": "Post unliked"}, status=status.HTTP_200_OK)
    return Response({"detail": "Post liked"}, status=status.HTTP_201_CREATED)


# Create a comment on a post
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    content = request.data.get('content')

    if not content:
        return Response({'detail': 'Content is required'}, status=status.HTTP_400_BAD_REQUEST)

    comment = Comment.objects.create(post=post, author=request.user, content=content)
    return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)


# List Comments for a Post
class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id).order_by('-created_at')


# Delete a comment
@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"detail": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)

    if comment.author != request.user:
        return Response({"detail": "You can only delete your own comments."}, status=status.HTTP_403_FORBIDDEN)

    comment.delete()
    return Response({"detail": "Comment deleted."}, status=status.HTTP_204_NO_CONTENT)






































































































































































































































# from django.shortcuts import render
#
# from django.core.exceptions import ObjectDoesNotExist
# from rest_framework import generics, permissions
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Post, Comment
# from .serializers import PostSerializer, CommentSerializer
# from rest_framework import generics, permissions, status
# from django.shortcuts import get_object_or_404
# from rest_framework import generics, permissions
# from .models import Comment
# from .serializers import CommentSerializer
# from rest_framework.permissions import IsAuthenticated
#
# from .models import Post, Comment, Like
# from .serializers import PostSerializer, CommentSerializer, LikeSerializer
#
#
# class PostListCreateView(generics.ListCreateAPIView):
#     queryset = Post.objects.all().order_by('-created_at')
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#
#     def perform_create(self, serializer):
#         serializer.save(creator=self.request.user)
#
#
# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def like_post(request, post_id):
#     try:
#         post = Post.objects.get(id=post_id)
#     except Post.DoesNotExist:
#         return Response({'detail': 'Post not found'}, status=404)
#
#     if request.user in post.likes.all():
#         post.likes.remove(request.user)
#         return Response({'detail': 'Unliked'}, status=200)
#     else:
#         post.likes.add(request.user)
#         return Response({'detail': 'Liked'}, status=200)
#
#
# class CommentCreateView(generics.CreateAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
#
#         class PostCreateView(generics.CreateAPIView):
#             queryset = Post.objects.all()
#             serializer_class = PostSerializer
#             permission_classes = [permissions.IsAuthenticated]
#
#             def perform_create(self, serializer):
#                 serializer.save(creator=self.request.user)
#
#
# class PostListView(generics.ListAPIView):
#     queryset = Post.objects.all().order_by('-created_at')
#     serializer_class = PostSerializer
#     permission_classes = [permissions.AllowAny]
#
#
# # Post creation view
# class PostCreateView(generics.CreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
#     def perform_create(self, serializer):
#         serializer.save(creator=self.request.user)
#
#
# # List all posts
# class PostListView(generics.ListAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#
#
# # Create a comment on a post
# @api_view(['POST'])
# def create_comment(request, post_id):
#     post = get_object_or_404(Post, id=post_id)
#     content = request.data.get('content')
#
#     if not content:
#         return Response({'detail': 'Content is required'}, status=status.HTTP_400_BAD_REQUEST)
#
#     comment = Comment.objects.create(post=post, author=request.user, content=content)
#     return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
#
#
# # Like or unlike a post
# @api_view(['POST'])
# def toggle_like(request, post_id):
#     post = get_object_or_404(Post, id=post_id)
#     user = request.user
#
#     # Check if the user has already liked the post
#     like, created = Like.objects.get_or_create(user=user, post=post)
#
#     if not created:
#         like.delete()  # If the like already exists, delete it (unlike)
#         return Response({"detail": "Post unliked"}, status=status.HTTP_200_OK)
#
#     return Response({"detail": "Post liked"}, status=status.HTTP_201_CREATED)
#
#
# class CommentListView(generics.ListAPIView):
#     serializer_class = CommentSerializer
#     permission_classes = [permissions.AllowAny]
#
#     def get_queryset(self):
#         post_id = self.kwargs['post_id']
#         return Comment.objects.filter(post_id=post_id).order_by('-created_at')
#
#
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_comment(request, comment_id):
#     try:
#         comment = Comment.objects.get(id=comment_id)
#     except Comment.DoesNotExist:
#         return Response({"detail": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)
#
#     # Optional: only allow the comment author to delete
#     if comment.author != request.user:
#         return Response({"detail": "You can only delete your own comments."}, status=status.HTTP_403_FORBIDDEN)
#
#     comment.delete()
#     return Response({"detail": "Comment deleted."}, status=status.HTTP_204_NO_CONTENT)
