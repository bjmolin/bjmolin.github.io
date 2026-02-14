from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=300)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image = models.URLField(blank=True)  # URL to image (hosted externally)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Skill(models.Model):
    CATEGORIES = [
        ('BE', 'Backend'),
        ('FE', 'Frontend'),
        ('DB', 'Database'),
        ('DEV', 'DevOps'),
        ('OTHER', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORIES)
    proficiency = models.IntegerField(default=3, choices=[(i, str(i)) for i in range(1, 6)])
    
    def __str__(self):
        return self.name