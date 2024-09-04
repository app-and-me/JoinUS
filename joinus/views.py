from django.shortcuts import render


def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request, 'home.html')

def teacherHome(request):
    return render(request, 'teacherHome.html')

def myclub(request):
    return render(request, 'myclub.html')

def studentPassword(request):
    return render(request, 'student-password.html')