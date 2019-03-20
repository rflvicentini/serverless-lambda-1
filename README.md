# Serverless Framework + AWS Lambda - 1

## Install

```
npm install
```

## Configure AWS Credentials

```
aws configure --profile exemplo
```

## Deploy

```
serverless deploy -v
```

```
serverless deploy -v -s dev
```

## Invoke Function

```
serverless invoke -s dev -f hello -l
```

```
serverless invoke local -s dev -f hello -l
```

```
sls invoke local -s dev -f account-get --data '{ "pathParameters":{"accountId":"4fd19e6e-77a0-4ef3-8cf7-2b63d0066e42"} }'
```

```
sls invoke local -s dev -f example-with-query --data '{ "queryStringParameters":{"accountId":"4fd19e6e-77a0-4ef3-8cf7-2b63d0066e42"} }'
```

```
export SLS_DEBUG=\*
```

## Fetch the Function Logs

```
serverless logs -f hello -t
```

## Cleanup

```
serverless remove -s dev
```

## Partial Deploy

```
serverless deploy -v -f hello
```

## Install Dependencies

```
npm install --save lodash
```

## Deploy Resources

### Create

- DEV

```
aws cloudformation create-stack --stack-name serverless-lambda-1-resources --template-body file://infra/resources-cloud-formation.yml --parameters ParameterKey=Project,ParameterValue=serverless-lambda-1 ParameterKey=Stage,ParameterValue=dev
```

- HML

```
aws cloudformation create-stack --stack-name serverless-lambda-1-resources --template-body file://infra/resources-cloud-formation.yml --parameters ParameterKey=Project,ParameterValue=serverless-lambda-1 ParameterKey=Stage,ParameterValue=dev
```

- PRD

```
aws cloudformation create-stack --stack-name serverless-lambda-1-resources --template-body file://infra/resources-cloud-formation.yml --parameters ParameterKey=Project,ParameterValue=serverless-lambda-1 ParameterKey=Stage,ParameterValue=prd
```

### Update

- DEV

```
aws cloudformation update-stack --stack-name serverless-lambda-1-resources --template-body file://infra/resources-cloud-formation.yml --parameters ParameterKey=Project,ParameterValue=serverless-lambda-1 ParameterKey=Stage,ParameterValue=dev
```

- HML

```
aws cloudformation update-stack --stack-name serverless-lambda-1-resources --template-body file://infra/resources-cloud-formation.yml --parameters ParameterKey=Project,ParameterValue=serverless-lambda-1 ParameterKey=Stage,ParameterValue=dev
```

- PRD

````
aws cloudformation update-stack --stack-name serverless-lambda-1-resources --template-body file://infra/resources-cloud-formation.yml --parameters ```
ParameterKey=Project,ParameterValue=serverless-lambda-1 ParameterKey=Stage,ParameterValue=prd
````

### Cleanup

```
aws cloudformation delete-stack --stack-name serverless-lambda-1-resources
```
