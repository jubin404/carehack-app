from django.db import models

# Create your models here.
class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('parent', 'Parent'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ClassGroup(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    teachers = models.ManyToManyField(
        User,
        limit_choices_to={'role': 'teacher'},
        related_name='class_groups',
        blank=True,
    )


class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('male','Male'), ('female','Female')], null=True, blank=True)
    address = models.TextField()
    parent_email = models.EmailField()
    contact = models.CharField(max_length=15)
    class_group = models.ForeignKey(ClassGroup, on_delete=models.SET_NULL, null=True)


ALLERGY_TYPE_CHOICES = [
    ('food', 'Food'),
    ('environment', 'Environment'),
    ('medication', 'Medication'),
    ('other', 'Other'),
]

class Allergy(models.Model):
    id = models.AutoField(primary_key=True)
    allergy = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=ALLERGY_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class HealthData(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    height = models.FloatField()
    weight = models.FloatField()
    blood_type = models.CharField(max_length=10)
    allergies = models.ManyToManyField(Allergy, related_name='students', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MedicalHistory(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    medical_condition = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class  Tests(models.Model):
    id = models.AutoField(primary_key=True)
    test_name = models.CharField(max_length=100)

class TestResults(models.Model):
    id = models.AutoField(primary_key=True)
    test = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
