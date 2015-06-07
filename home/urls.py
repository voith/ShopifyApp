from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
        url(r'^$', 'home.views.index', name='root_path'),
)
