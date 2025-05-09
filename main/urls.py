from django.urls import path

from . import views
from .views import home
from .views import post_bid
from .views import view_bids
from .views import select_worker
from django.urls import path, include

from .views import select_worker, view_assigned_worker

urlpatterns = [
    path('', home, name='home'),
    path('jobs/<int:job_id>/bid/', post_bid, name='post-bid'),
    path('jobs/<int:job_id>/bids/', view_bids, name='view-bids'),
    path('jobs/<int:job_id>/select_worker/', select_worker, name='select-worker'),
    path('jobs/<int:job_id>/assigned_worker/', views.view_assigned_worker, name='view-assigned-worker'),
    path('api/wallet/', include('wallet.urls')),

]
