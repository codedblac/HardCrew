from rest_framework import generics, permissions, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Wallet, Transaction, Escrow
from .serializers import WalletSerializer, TransactionSerializer, EscrowSerializer
from decimal import Decimal
from rest_framework.exceptions import ValidationError


# View for retrieving a user's wallet
class WalletDetailView(generics.RetrieveAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Ensure the user can only access their own wallet
        return self.request.user.wallet


# View for making a deposit
class DepositView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        amount = serializer.validated_data['amount']

        # Ensure the wallet has enough balance to deposit (for example, funds should be in the wallet before depositing)
        if user.wallet.balance < amount:
            raise ValidationError("Insufficient funds in wallet to make the deposit.")

        # Deduct the amount from user's wallet
        user.wallet.balance -= amount
        user.wallet.save()

        # Create the deposit transaction
        transaction = serializer.save(user=user, transaction_type='deposit')

        return Response({
            "detail": "Deposit successful",
            "transaction": TransactionSerializer(transaction).data
        }, status=status.HTTP_201_CREATED)


# View for making a withdrawal
class WithdrawView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        amount = serializer.validated_data['amount']

        # Ensure the user has enough balance to withdraw
        if user.wallet.balance < amount:
            raise ValidationError("Insufficient funds to withdraw.")

        # Deduct the amount from the wallet
        user.wallet.balance -= amount
        user.wallet.save()

        # Create the withdrawal transaction
        transaction = serializer.save(user=user, transaction_type='withdrawal')

        return Response({
            "detail": "Withdrawal successful",
            "transaction": TransactionSerializer(transaction).data
        }, status=status.HTTP_201_CREATED)


# View for transaction history
class TransactionHistoryView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter transactions for the authenticated user
        return Transaction.objects.filter(user=self.request.user)


# View for making a payment to a worker
class PaymentView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        employer = self.request.user
        worker = self.request.data.get('worker')  # worker will be passed in the payload
        amount = serializer.validated_data['amount']

        # Ensure employer has enough balance to pay
        if employer.wallet.balance < amount:
            raise ValidationError("Insufficient funds to make the payment.")

        # Deduct amount from employer's wallet
        employer.wallet.balance -= amount
        employer.wallet.save()

        # Add the payment to the worker's wallet
        worker_wallet = worker.wallet
        worker_wallet.balance += amount
        worker_wallet.save()

        # Create the payment transaction
        transaction = serializer.save(user=employer, transaction_type='payment')

        return Response({
            "detail": "Payment successful",
            "transaction": TransactionSerializer(transaction).data
        }, status=status.HTTP_201_CREATED)


# View for handling Escrow transactions
class EscrowCreateView(generics.CreateAPIView):
    queryset = Escrow.objects.all()
    serializer_class = EscrowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        employer = self.request.user
        worker = self.request.data.get('worker')  # worker will be passed in the payload
        amount = serializer.validated_data['amount']

        # Create an escrow record between employer and worker
        escrow = serializer.save(employer=employer, worker=worker)

        # Deduct the amount from employer's wallet
        employer.wallet.balance -= amount
        employer.wallet.save()

        # Record the transaction as an escrow deposit
        transaction = Transaction.objects.create(
            user=employer,
            amount=amount,
            transaction_type='deposit',
            description=f"Escrow for job {escrow.job_id}"
        )

        return Response({
            "detail": "Escrow created successfully",
            "escrow": EscrowSerializer(escrow).data,
            "transaction": TransactionSerializer(transaction).data
        }, status=status.HTTP_201_CREATED)


# View to release escrow and pay worker
@api_view(['POST'])
def release_escrow(request, escrow_id):
    escrow = get_object_or_404(Escrow, id=escrow_id)

    if escrow.is_released:
        return Response({"detail": "Escrow already released."}, status=status.HTTP_400_BAD_REQUEST)

    employer = request.user
    if employer != escrow.employer:
        return Response({"detail": "You can only release escrow for jobs you created."},
                        status=status.HTTP_403_FORBIDDEN)

    # Release the escrow and transfer the funds to the worker
    escrow.is_released = True
    escrow.save()

    # Add the escrow amount to worker's wallet
    worker_wallet = escrow.worker.wallet
    worker_wallet.balance += escrow.amount
    worker_wallet.save()

    # Create the transaction for payment
    transaction = Transaction.objects.create(
        user=escrow.worker,
        amount=escrow.amount,
        transaction_type='payment',
        description=f"Payment for escrow job {escrow.job_id}"
    )

    return Response({
        "detail": "Escrow released and payment successful.",
        "escrow": EscrowSerializer(escrow).data,
        "transaction": TransactionSerializer(transaction).data
    }, status=status.HTTP_200_OK)
