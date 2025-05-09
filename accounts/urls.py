from django.urls import path
from .views import RegisterView, LoginView
from .views import UserProfileDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/<int:id>/', UserProfileDetailView.as_view(), name='user-profile'),
]
