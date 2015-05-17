'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'underscore',
    '../../../assets/js/models/sammyViewModel.js',
    '../../../assets/js/models/person.js',
    'knockout.validation'
    ], function ($, ko, _, SammyViewModel, Person) {
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

    self.sammy = new SammyViewModel();

    self.person = new Person('', false);
    self.personsList = ko.observableArray([]);

    self.addPerson = function(person) {
      var name = ko.unwrap(person.name);
      var tyro = ko.unwrap(person.tyro);
      var searchedPerson = findPersonByName(name);
      self.person.status(false);

      if(!searchedPerson && name != '') {
        self.personsList.push(new Person(name,tyro));
      } 
    };

    self.removePerson = function(person) {
      self.personsList.remove(person);
    }

    self.editPerson = function(person) {
      var name = ko.unwrap(person.name);
      var tyro = ko.unwrap(person.tyro);
      self.person.name(name);
      self.person.tyro(tyro);
      setPersonStatus(name);
      self.person.status(true);
    }

    self.updatePerson = function(person) {
      var name = ko.unwrap(person.name);
      var tyro = ko.unwrap(person.tyro);
      var searchedPerson = findPersonByStatus();
      searchedPerson.name(name);
      searchedPerson.tyro(tyro);
      self.person.status(false);
    }

    function setPersonStatus(name) {
      _.each(ko.unwrap(self.personsList), function(person) {
        if(ko.unwrap(person.name) == name ){
          person.status = true;
        } else {
          person.status = false;
        }
      });
    }

    function findPersonByName(name) {
      var existPerson =  _.find(ko.unwrap(self.personsList), 
        function(person) { 
          return ko.unwrap(person.name) == name; 
        });

      return existPerson;
    }

    function findPersonByStatus() {
      var existPerson =  _.find(ko.unwrap(self.personsList), 
        function(person) { 
          return ko.unwrap(person.status) == true; 
        });

      return existPerson;
    }


  };
});
