module.exports = {
   apps : [{
      name   : "OSF",
      script : "./server.js",
      watch: ["./server.js"],
      env: {
         NODE_ENV: "production",  // default environment
         DB_END_POINT: "mongodb+srv://root:root@atlascluster.im1sbt0.mongodb.net/OSF-Card-Sort"
      },
      // env_development: {
      //    NODE_ENV: "development",
      //    DB_END_POINT: "mongodb://127.0.0.1:27017/OSFCardSort"
      // },
      // env_production: {
      //    NODE_ENV: "production",
      //    DB_END_POINT: "mongodb+srv://root:root@atlascluster.im1sbt0.mongodb.net/OSF-Card-Sort"
      // },
   }]
}