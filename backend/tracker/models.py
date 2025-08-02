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
        null=True,
        blank=True,
    )


class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.TextField()
    parent_email = models.EmailField()
    contact = models.CharField(max_length=15)
    class_group = models.ForeignKey(ClassGroup, on_delete=models.SET_NULL, null=True)

