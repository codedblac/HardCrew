# Create your models here.
from django.db import models
# from django.conf import settings
# User = settings.AUTH_USER_MODEL
from django.contrib.auth import get_user_model
User = get_user_model()




class Job(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    CATEGORY_CHOICES = [
        ('driving', 'Driving'),
        ('carpentry', 'Carpentry'),
        ('design', 'Interior Design'),
        ('babysitting', 'Babysitting'),
        ('laundry', 'Laundry'),
        ('painting', 'Painting'),
        # Add more as needed
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posted_jobs')

    def __str__(self):
        return self.title
