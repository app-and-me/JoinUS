from django.utils.translation import get_language, check_for_language
from django.http import HttpResponseRedirect
from django.conf import settings

class LanguageRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path_info = request.path_info
        current_language = get_language()

        # Skip language redirection for API requests
        if path_info.startswith('/api/'):
            return self.get_response(request)

        # Check if the current language is already in the URL
        if path_info.startswith(f'/{current_language}/'):
            return self.get_response(request)

        # Check if any valid language code is already in the URL
        for lang_code, _ in settings.LANGUAGES:
            if path_info.startswith(f'/{lang_code}/'):
                return self.get_response(request)

        # Redirect to the URL with the default language code
        return HttpResponseRedirect(f'/{current_language}{path_info}')