from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL


class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    mpesa_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s Wallet - Balance: {self.balance}"


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('payment', 'Payment'),
        ('commission', 'Commission'),
        ('refund', 'Refund'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.transaction_type.title()} - {self.user.email} - KES {self.amount}"


class PlatformWallet(models.Model):
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Platform Wallet - Balance: {self.balance}"


class Escrow(models.Model):
    job_id = models.IntegerField(unique=True)
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='escrows_sent')
    worker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='escrows_received')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_released = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Escrow Job {self.job_id} - {self.employer.email} -> {self.worker.email}"
