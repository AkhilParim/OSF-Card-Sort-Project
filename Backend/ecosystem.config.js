// to start using pm2   - pm2 start ecosystem.config.js 
// or with env variable -  pm2 start ecosystem.config.js --env production

module.exports = {
   apps : [{
      name   : "CardSort",
      script : "./server.js",
      watch: ["./server.js"],
      env: {
         NODE_ENV: "production",  // default environment
         DB_END_POINT: "mongodb://3.132.135.90:27017/OSFCardSort"
      },
      // env_development: {
      //    NODE_ENV: "development",
      //    DB_END_POINT: "mongodb://127.0.0.1:27017/OSFCardSort"
      // },
      // env_production: {
      //    NODE_ENV: "production",
      //    DB_END_POINT: "mongodb://3.132.135.90:27017/OSFCardSort"
      // },
   }]
}