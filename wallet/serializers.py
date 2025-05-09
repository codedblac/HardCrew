from rest_framework import serializers
from .models import Wallet, Transaction, Escrow


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'user', 'balance', 'mpesa_number']
        read_only_fields = ['id', 'user', 'balance']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'amount', 'transaction_type', 'description', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class EscrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escrow
        fields = ['id', 'job_id', 'employer', 'worker', 'amount', 'is_released', 'created_at']
        read_only_fields = ['id', 'employer', 'is_released', 'created_at']
