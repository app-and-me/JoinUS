from django.db import models

class Club(models.Model):
    name = models.CharField(max_length=255)
    teacher_id = models.IntegerField()
    info = models.TextField()
    ph = models.TextField()
    able1 = models.IntegerField()
    able2 = models.IntegerField()
    able3 = models.IntegerField()
    now1 = models.IntegerField()
    now2 = models.IntegerField()
    now3 = models.IntegerField()

class ClubLog(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='logs')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)