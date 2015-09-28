var app = angular.module('plunker', []);

var displayName = '';

app.controller('showCtrl', function() {
    this.newName = '';

});

function runEffect() {
    var options = {};

    $("#login-dialog").toggle("slide", options, 500);
}

app.directive('loginForm', function() {

    return {
        restrict: 'A',
        templateUrl: 'login-form.html',

        controller: function() {
            this.addName = function(disp) {
                disp.newName = this.name;
                displayName = this.name;
                if (this.name.length > 0) {
                    runEffect();
                    createRender();
                    $("#login-button").hide();
                    animate();

                }
            };
            this.name = '';
        },

        controllerAs: 'form'
    };
});