from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Job, Bid
from .serializers import BidSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework import status


def home(request):
    return JsonResponse({"message": "Welcome to HardCrew API"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_bid(request, job_id):
    # Check if the job exists
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    # Create the bid
    bid_data = {
        'job': job.id,
        'worker': request.user.id,
        'bid_amount': request.data.get('bid_amount'),
        'message': request.data.get('message')
    }
    serializer = BidSerializer(data=bid_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def view_bids(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    bids = job.bids.all()
    serializer = BidSerializer(bids, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def select_worker(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    if job.employer != request.user:
        return Response({"detail": "You are not the employer of this job."}, status=status.HTTP_403_FORBIDDEN)

    worker_id = request.data.get("worker_id")

    try:
        worker = User.objects.get(id=worker_id)
    except User.DoesNotExist:
        return Response({"detail": "Worker not found."}, status=status.HTTP_404_NOT_FOUND)

    job.selected_worker = worker
    job.save()

    return Response({"detail": "Worker selected successfully."}, status=status.HTTP_200_OK)


@api_view(['GET'])
def view_assigned_worker(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    if job.selected_worker:
        return Response({
            "worker": job.selected_worker.username,
            "worker_id": job.selected_worker.id
        })
    else:
        return Response({"detail": "No worker assigned yet"}, status=status.HTTP_404_NOT_FOUND)
