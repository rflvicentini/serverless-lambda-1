module.exports = config();
module.exports.config = config;

function config() {
  const env = "dev";
  const resourcesEnv = env.substring(0, 3);

  const serviceName = `serverless-lambda-1`;

  return {
    env,
    resourcesEnv,
    resourcesPrefix: `${serviceName}-${resourcesEnv}`,
    serviceName,
    envVar1: "123",
    db: {
      tables: {
        account: {
          tableName: `${serviceName}-${resourcesEnv}-account`
        }
      }
    }
  };
}
