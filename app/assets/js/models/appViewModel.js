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
    self.person = new Person('', false,0);
    self.personsList = ko.observableArray([]);

    self.pairList = ko.observableArray([]);

    self.pairSwitch = pairSwitch;

    self.addPerson = function(person) {
      var name = ko.unwrap(person.name);
      var tyro = ko.unwrap(person.tyro);

      var searchedPerson = findPersonByName(name);

      if(!searchedPerson && name != '') {
        self.personsList.push(new Person(name,tyro,Date.now()));
      } 
    };

    self.removePerson = function(person) {
      self.personsList.remove(person);
    }

    self.editPerson = function(person) {
      self.person.name(ko.unwrap(person.name));
      self.person.tyro(ko.unwrap(person.tyro));
      self.person.id(ko.unwrap(person.id));
    }

    self.updatePerson = function(person) {
      var searchedPerson = findPersonById(ko.unwrap(person.id));
      searchedPerson.name(ko.unwrap(person.name));
      searchedPerson.tyro(ko.unwrap(person.tyro));

      self.person.id(0);
    }

    function findPersonByName(name) {
      var existPerson =  _.find(ko.unwrap(self.personsList), 
        function(person) { 
          return ko.unwrap(person.name) == name; 
        });

      return existPerson;
    }

    function findPersonById(id) {
      var existPerson =  _.find(ko.unwrap(self.personsList), 
        function(person) { 
          return ko.unwrap(person.id) == id; 
        });

      return existPerson;
    }

    function getPersonByTyro(value) {
      return _.filter(ko.unwrap(self.personsList),function(item){ return ko.unwrap(item.tyro) == value});
    }

    function pairSwitch() {
      var sortListByTyro = _.sortBy(ko.unwrap(self.personsList),function(item){
        return ko.unwrap(item.tyro);
      });

      var pairList = [];
      var pairListLength = Math.round((sortListByTyro.length)/2);

      for(var i = 0, j = sortListByTyro.length-1; i < pairListLength ; i++,j--){
        var arr = [ko.unwrap(sortListByTyro[i].name),ko.unwrap(sortListByTyro[j].name)];
        pairList.push(arr.join(' - '));
      }

      self.pairList(pairList);
    }

  };
});
