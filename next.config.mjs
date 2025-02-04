/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.daisyui.com',
                port:'',
                pathname:'/images/stock/'
            }
        ]
    },
    experimental: {
        appDir: true,
      },
      future: { webpack5: true },
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
          config.resolve.alias.canvas = false
          config.resolve.alias.encoding = false
          return config
    },
    webpack: (config) => {
         config.externals = [...config.externals, "jsdom"];
         return config;
     },
};

export default withPWA({nextConfig});
