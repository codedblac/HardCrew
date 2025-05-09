from django.urls import path

from main.views import view_bids, post_bid, select_worker, view_assigned_worker
from .views import JobCreateView, JobListView

urlpatterns = [
    path('create/', JobCreateView.as_view(), name='create-job'),
    path('list/', JobListView.as_view(), name='list-jobs'),
    path('<int:job_id>/bids/', view_bids, name='view-bids'),
    path('<int:job_id>/bid/', post_bid, name='post-bid'),
    path('<int:job_id>/select_worker/', select_worker, name='select-worker'),
    path('<int:job_id>/assigned_worker/', view_assigned_worker, name='view-assigned-worker'),
]
