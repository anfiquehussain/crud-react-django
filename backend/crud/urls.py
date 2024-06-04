from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.Home, name='home'),
    path('create/', views.Create, name='create'),
    path('display/', views.Display, name='display'),
    path('update_product/', views.update_product, name='update_product'),
    path('delete/', views.Delete, name='delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)