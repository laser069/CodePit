from django.db import models
from django.contrib.auth.models import User
from problems.models import ProblemModel

class SubmissionModel(models.Model):
    
    STATUS_CHOICES = [
    ('Accepted', 'Accepted'),
    ('Rejected', 'Rejected'),
    ('Failed', 'Failed'),
    ]

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="submissions")
    problem = models.ForeignKey(ProblemModel,on_delete=models.CASCADE,related_name="submissions")
    code = models.TextField()
    language = models.CharField(max_length=64,default='python')
    status = models.CharField(max_length=64,choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.problem.title} - {self.created_at}"

