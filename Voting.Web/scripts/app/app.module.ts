/// <reference path="tsd.d.ts" />
/// <reference path="../tools/typings/voting.d.ts" />

'use strict';

((): void => {

    var app = angular.module('votingApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'LocalStorageModule', 'facebook', 'angular-loading-bar']);
    //app.constant('apiBaseUrl', 'http://ptvotingservice.azurewebsites.net/api/');
    app.constant('apiBaseUrl', 'http://localhost:60587/api/');

    app.config(['$routeProvider',
        ($routeProvider: ng.route.IRouteProvider): void => {
            Voting.Routes.configure($routeProvider);
        }]);

    app.config(['$httpProvider',
        ($httpProvider: ng.IHttpProvider): void => {
            $httpProvider.interceptors.push('Voting.Services.AuthInterceptor');
        }]);

    app.config(['FacebookProvider', facebookProvider => {
        //var myAppId = '434830250041685';
        var myAppId = '437967029728007'; //dev
        facebookProvider.init(myAppId);
    }]);
  
    app.config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 50;
    }]);
})();