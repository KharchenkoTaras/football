angular.module("footballApp.controllers").controller("AboutController", ["$scope", function ($scope) {

    (function ($) {
        $.fn.NavBar = function () {
            return this.each(function () {
                var $navBar = $(this);
                $navBar.on('click', '.js-openMenu', function (event) {
                    event.stopPropagation();
                    $navBar.toggleClass('is-open');
                });
                $navBar.click(function () {
                    if ($navBar.hasClass('is-open')) {
                        $navBar.removeClass('is-open');
                    }
                });
                $navBar.on('click', '.ms-NavBar-item:not(.is-disabled)', function (event) {
                    event.stopPropagation();
                    if ($(this).children('.ms-NavBar-link').length === 0) {
                        event.preventDefault();
                    }
                    $(this).siblings('.ms-NavBar-item').removeClass('is-selected');
                    if ($navBar.find('.ms-NavBar-item.ms-NavBar-item--search .ms-TextField-field').val().length === 0) {
                        $('.ms-NavBar-item.ms-NavBar-item--search').removeClass('is-open').find('.ms-TextField-field').blur();
                    }
                    if ($(this).hasClass('ms-NavBar-item--hasMenu')) {
                        $(this).children('.ms-ContextualMenu:first').toggleClass('is-open');
                        $(this).toggleClass('is-selected');
                    } else {
                        $(this).addClass('is-selected');
                        $navBar.removeClass('is-open').find('.ms-ContextualMenu').removeClass('is-open');
                    }
                    if ($(this).hasClass('ms-NavBar-item--search')) {
                        $(this).addClass('is-open');
                        $(this).find('.ms-TextField-field').focus();
                        $navBar.find('.ms-ContextualMenu:first').removeClass('is-open');
                    }
                });
                $navBar.on('click', '.ms-NavBar-item .ms-ContextualMenu', function (event) {
                    event.stopPropagation();
                    $(this).removeClass('is-open');
                    $navBar.removeClass('is-open').find('.ms-NavBar-item--hasMenu').removeClass('is-selected');
                });
                $(document).on('click', 'html', function (event) {
                    $navBar.find('.ms-NavBar-item').removeClass('is-selected').find('.ms-ContextualMenu').removeClass('is-open');
                    if ($navBar.find('.ms-NavBar-item.ms-NavBar-item--search .ms-TextField-field').val().length === 0) {
                        $navBar.find('.ms-NavBar-item.ms-NavBar-item--search').removeClass('is-open').find('.ms-TextField-field').blur();
                    }
                });
            });
        };
    }(jQuery));
    if ($.fn.NavBar) {
        $('.ms-NavBar').NavBar();
    }
    //@ sourceURL=pen.js

}];