'use strict';

$(document).ready(function () {

    const LocalizationManager = new function () {
        const localizableItems = $('[data-localizable]');

        var currentLocale = ''

        this.switchLanguage = function (locale) {
            locale = locale.toLowerCase();
            if (currentLocale === locale) return;

            $.getJSON('../resources/lang/' + locale + '.json', function (data) {

                localizableItems.each(function () {
                    var key = this.getAttribute('data-localizable');
                    var value = data[key];
                    if (value !== null && value !== undefined) {
                        this.innerHTML = value;
                    }
                });
                localStorage.setItem("lang", locale)

                currentLocale = locale;
            });
        }

    };

    var currentLanguage = localStorage.getItem("lang");
    if(currentLanguage == null) {
        currentLanguage = 'ro'
    }
    LocalizationManager.switchLanguage(currentLanguage)

    $('.btn-switch-language').click(function () {
        const locale = this.getAttribute('data-lang');
        LocalizationManager.switchLanguage(locale);
    });

});
