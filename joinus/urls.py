from django.contrib import admin
from django.urls import include, path
from django.conf.urls.i18n import i18n_patterns

from joinus.views import home, index, teacherHome, myclub

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', index),
    # path('home/', home),
    path('api/users/', include('users.urls')),
    path('api/clubs/', include('clubs.urls')),
    path('api/admin/', include('admins.urls'))
]

urlpatterns += i18n_patterns(
    path('', index),
    path('home/', home),
    path('teacherHome/', teacherHome),
    path('myclub/', myclub)
)
