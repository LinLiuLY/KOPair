'use strict';

/* global define:true*/
define(['jquery',
    'knockout'
    ], function ($, ko) {
  return function (name,tyro) {
    var self = this;

    self.name = ko.observable(name);
    self.tyro = ko.observable(tyro);

  };
});
