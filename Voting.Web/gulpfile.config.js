'use strict';
var GulpConfig = (function () {
  function GulpConfig() {

    this.source = './scripts/';
    this.sourceApp = this.source + 'app/';

    this.typings = this.source + 'tools/typings/';
    this.libraryTypeScriptDefinitions = this.typings + '**/*.ts';
    this.appTypeScriptReferences = this.typings + 'voting.d.ts';
    this.allTypeScript = this.sourceApp + '**/*.ts';
  }
  return GulpConfig;
})();

module.exports = GulpConfig;