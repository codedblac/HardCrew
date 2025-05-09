from django.contrib import admin
from .models import Wallet, Transaction, Escrow, PlatformWallet

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'balance', 'mpesa_number')
    search_fields = ('user__email',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'transaction_type', 'created_at')
    search_fields = ('user__email',)
    list_filter = ('transaction_type',)

@admin.register(Escrow)
class EscrowAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'employer', 'worker', 'amount', 'is_released', 'created_at')
    search_fields = ('employer__email', 'worker__email')

@admin.register(PlatformWallet)
class PlatformWalletAdmin(admin.ModelAdmin):
    list_display = ('balance',)
