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

    self.name = ko.observable('1111');
    self.tyro = ko.observable(false);

    self.persons = ko.observableArray([]);

    self.addPerson = function() {
      console.log(ko.unwrap(self.name));
      self.persons.push(ko.unwrap(self.name));
    };

    // Add submodels here
    // Sammy view model for local navigation
    self.sammy = new SammyViewModel();


  };
});
