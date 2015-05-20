'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'knockout.validation'
    ], function ($, ko) {
  return function (name,tyro,id) {
    var self = this;

    self.name = ko.observable(name);
    self.tyro = ko.observable(tyro);
    self.id = ko.observable(id);

    self.fullName = ko.computed(function(){
    	return ko.unwrap(self.tyro) ? '(tyro)' : '';;
    });
    
    self.name.extend({ 
    	required: {
    		params:	true,
    		message: 'Name is required.'
    	}, 
    });

  };
});
