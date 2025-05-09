from rest_framework import serializers
from .models import Post, Comment, Like
from accounts.models import User  # Or use get_user_model() if preferred


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.full_name', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_name', 'content', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']


class LikeSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = Like
        fields = ['id', 'user', 'user_name', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(source='creator.full_name', read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'creator',
            'creator_name',
            'caption',
            'video',
            'created_at',
            'likes_count',
            'likes',
            'comments',
        ]
        read_only_fields = ['id', 'creator', 'creator_name', 'likes_count', 'likes', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()
