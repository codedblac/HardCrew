from django.db import models
from django.conf import settings
from django.conf import settings



class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    employer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employer_jobs')
    selected_worker = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='assigned_jobs', null=True, blank=True,
                                        on_delete=models.SET_NULL)

    def __str__(self):
        return self.title


class Bid(models.Model):
    job = models.ForeignKey(Job, related_name='bids', on_delete=models.CASCADE)
    worker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='worker_bids')
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bid for {self.job.title} by {self.worker.email}"
