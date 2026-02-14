from django.shortcuts import render
from rest_framework import viewsets
from .models import Project, Skill
from .serializers import ProjectSerializer, SkillSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.object.all()
    serializer_class = ProjectSerializer 

    def get_queryset(self): 
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured', None)
        if featured is not None: 
            queryset = queryset.filter(featured=True)
        return queryset
    
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer