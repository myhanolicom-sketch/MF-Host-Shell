const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',
  filename: 'remoteEntry.js',
  
  exposes: {
    './AppComponent': './src/app/app.component.ts'
  },

  remotes: {
    admin: 'http://localhost:4201/remoteEntry.js',
    dashboard: 'http://localhost:4202/remoteEntry.js'
  },

  shared: {
    '@angular/core': { singleton: true, strictVersion: false },
    '@angular/common': { singleton: true, strictVersion: false },
    '@angular/router': { singleton: true, strictVersion: false },
    'rxjs': { singleton: true, strictVersion: false },
    'primeng': { singleton: true, strictVersion: false }
  }
});
