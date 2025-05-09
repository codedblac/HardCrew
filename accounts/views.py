from rest_framework import generics, permissions, status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserProfile
from .serializers import RegisterSerializer, LoginSerializer, UserProfileSerializer


# User Registration
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


# User Login with JWT
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'email': user.email,
                'full_name': user.full_name,
                'role': user.role,
            }
        })


# Option 1: Retrieve profile by profile ID
class UserProfileDetailView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

class UserProfileUpdateView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile  # assumes a OneToOneField to User

# Option 2: Retrieve profile by user ID
@api_view(['GET'])
def user_profile(request, user_id):
    try:
        profile = UserProfile.objects.get(user__id=user_id)
    except UserProfile.DoesNotExist:
        return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)
