from django.contrib import admin
from django.urls import path, include

from .views import (
    WalletDetailView,
    DepositView,
    WithdrawView,
    TransactionHistoryView,
    PaymentView,
    EscrowCreateView,
    release_escrow
)

urlpatterns = [


    # Wallet detail (retrieve user's wallet)
    path('', WalletDetailView.as_view(), name='wallet-detail'),

    # Deposit money into the wallet
    path('deposit/', DepositView.as_view(), name='wallet-deposit'),

    # Withdraw money from the wallet
    path('withdraw/', WithdrawView.as_view(), name='wallet-withdraw'),

    # Transaction history (all wallet transactions)
    path('transactions/', TransactionHistoryView.as_view(), name='wallet-transactions'),

    # Make a payment to a worker
    path('payment/', PaymentView.as_view(), name='wallet-payment'),

    # Create an escrow (before payment to the worker)
    path('escrow/', EscrowCreateView.as_view(), name='create-escrow'),

    # Release escrow and pay the worker
    path('escrow/<int:escrow_id>/release/', release_escrow, name='release-escrow'),
]
