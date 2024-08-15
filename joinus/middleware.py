from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.translation import check_for_language, get_language
from django.conf import settings

from joinus.settings import LANGUAGE_CODE

class LanguageRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path_info.startswith(f'/{get_language()}/'):
            return self.get_response(request)

        user_languages = request.META.get('HTTP_ACCEPT_LANGUAGE', '').split(',')
        for language in user_languages:
            language_code = language.split(';')[0].strip()
            language_code = language_code.split('-')[0]
            if check_for_language(language_code):
                return HttpResponseRedirect(f'/{language_code}{request.path_info}')

        return HttpResponseRedirect(f'/{LANGUAGE_CODE}{request.path_info}')