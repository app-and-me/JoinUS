from django.contrib import admin
from django.urls import include, path
from django.conf.urls.i18n import i18n_patterns

from joinus.views import home, index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('clubs/', include('clubs.urls')),
    path('', index),
    path('home/', home),
]

urlpatterns += i18n_patterns(
    path('', index),
    path('home/', home),
)
