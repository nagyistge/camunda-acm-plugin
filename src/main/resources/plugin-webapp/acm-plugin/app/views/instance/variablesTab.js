ngDefine('cockpit.plugin.acm-plugin.views', function(module) {

  var VariablesCtrl = [ '$scope', 'camundaService', function($scope, camundaService) {
    'use strict';

    // retrieve from parent scope
    var caseData = $scope.caseData.newChild($scope);

    caseData.provide('variables', [ 'instance', function(instance) {
      // variables
      camundaService.caseInstanceVariables(instance.id).then(function(variables) {
        var data = [];
        for ( var key in variables) {
          if (variables.hasOwnProperty(key)) {
            data.push({
              name : key,
              type : variables[key].type,
              value : variables[key].value
            });
          }
        }

        console.log("Provider:");
        console.log(data);
        return data;
      });
    } ]);

    caseData.observe([ 'variables', function(variables) {
      console.log("Observer:");
      console.log(variables);
      $scope.caseInstanceVariables = variables;
    } ]);

  } ];

  module.config([ 'ViewsProvider', function(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.caseInstance.runtime.tab', {
      id : 'case-variables-table',
      label : 'Variables',
      url : 'plugin://acm-plugin/static/app/views/instance/variablesTab.html',
      controller : VariablesCtrl,
      priority : 10
    });
  } ]);

  return module;
});