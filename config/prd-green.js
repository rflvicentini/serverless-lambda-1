module.exports = config();
module.exports.config = config;

function config() {
  const env = "prd-green";
  const resourcesEnv = env.substring(0, 3);

  const serviceName = `serverless-lambda-1`;

  return {
    envVar1: "789",
    db: {
      tables: {
        account: {
          tableName: `${serviceName}-${resourcesEnv}-account`
        }
      }
    }
  };
}
