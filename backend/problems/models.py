from django.db import models

# Create your models here.


class ProblemModel(models.Model):
    title = models.CharField(max_length=100)
    problem_statement = models.TextField()
    examples = models.JSONField()
    testcase = models.JSONField()

    def __str__(self):
        return self.title
    