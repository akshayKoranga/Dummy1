const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '10.13.0'
        }
      }
    ]
  ];
  
  const plugins = [];
  require('@babel/register')({ presets, plugins });
  require('@babel/polyfill');
  require('./app.js');
  