from rest_framework import serializers
from .models import Student, ClassGroup, User, Allergy, HealthData, MedicalHistory, Tests, TestResults
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'password', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.password_hash = make_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance



class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)



class ClassGroupSerializer(serializers.ModelSerializer):
    teachers = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.filter(role='teacher'),
        required=False,
        allow_empty=True
    )

    class Meta:
        model = ClassGroup
        fields = ['id', 'name', 'teachers']


class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = ['id', 'allergy', 'type', 'created_at', 'updated_at']

class HealthDataSerializer(serializers.ModelSerializer):
    allergies = AllergySerializer(many=True, read_only=True)
    allergy_ids = serializers.PrimaryKeyRelatedField(
        queryset=Allergy.objects.all(), many=True, write_only=True, source='allergies'
    )

    class Meta:
        model = HealthData
        fields = [
            'id', 'student', 'height', 'weight', 'blood_type',
            'allergies', 'allergy_ids', 'created_at', 'updated_at'
        ]

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = ['id', 'student', 'medical_condition', 'created_at', 'updated_at']

class TestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tests
        fields = ['id', 'test_name']

class TestResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResults
        fields = ['id', 'test', 'result', 'notes', 'student', 'created_at', 'updated_at']

class StudentSerializer(serializers.ModelSerializer):
    healthdata = HealthDataSerializer(many=True, read_only=True, source='healthdata_set')
    medicalhistory = MedicalHistorySerializer(many=True, read_only=True, source='medicalhistory_set')
    testresults = TestResultsSerializer(many=True, read_only=True, source='testresults_set')

    class Meta:
        model = Student
        fields = [
            'id', 'name', 'date_of_birth', 'gender', 'address', 'parent_email', 'contact', 'class_group',
            'healthdata', 'medicalhistory', 'testresults'
        ]
