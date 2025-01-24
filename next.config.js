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
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node/,
        use: "raw-loader",
      });
      return config;
    },
  }