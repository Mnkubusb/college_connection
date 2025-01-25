
module.exports = {
    images: {
      domains: ["uploadthing.com", "utfs.io", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
      remotePatterns: [
        {
            protocol:'https',
            hostname:'**',
            port:'',
            pathname:'**',
        },
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      qualities: [25, 50, 75],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node/,
        use: "raw-loader",
      });
      return config;
    },
    webpack: (config) => {
       config.resolve.alias.canvas = false;
       return config;
      },
  }