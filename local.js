var AlexaAppServer = require('alexa-app-server');

AlexaAppServer.start({
  server_root: __dirname,
  public_html: 'public_html',
  app_dir: __dirname + '/build',
  app_root: '/alexa/',
  port: 80
});
