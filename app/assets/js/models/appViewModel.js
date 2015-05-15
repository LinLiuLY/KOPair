'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'underscore'
    '../../../assets/js/models/sammyViewModel.js',
    'knockout.validation'
    ], function ($, ko, _, SammyViewModel) {
  return function () {
    var self = this;

    // Configure knockout validation plugin
    // To decorate form-group elements, use the validationElement binding
    ko.validation.configure({
      decorateElement: true,
      errorElementClass: 'has-error',
      errorMessageClass: 'help-block',
      errorsAsTitle: false
    });

    // Write your code.
    // ...

    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();

  };
});
