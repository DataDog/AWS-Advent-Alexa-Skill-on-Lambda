const { name, description, version } = require('../package.json');

export default {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  role: process.env.AWS_LAMBDA_ROLE,
  functionName: name,
  description: `${description} (version ${version})`,
  region: 'us-east-1',
  handler: 'index.handler',
  timeout: 15,
  memorySize: 256
};
