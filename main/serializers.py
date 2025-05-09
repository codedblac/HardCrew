from rest_framework import serializers
from .models import Bid

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'job', 'worker', 'bid_amount', 'message', 'created_at']
