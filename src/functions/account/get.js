"use strict";

const response = require("../../application/response");
const db = require("../../application/db");
const { DynamoDB } = require("aws-sdk");

const dynamoDBDoc = new DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {
  try {
    console.log("started");
    console.log("event", event);

    // const qsParams = event.queryStringParameters || {};  // <<< Example for QueryString parameters

    const pathParameters = event.pathParameters || {};
    console.log("qsParams", pathParameters);

    if (!pathParameters.accountId) {
      return response.validationError(new Error("AccountId is required!"));
    }

    console.log("is valid");

    const dbParams = {
      TableName: db.tables.account.tableName,
      KeyConditionExpression: "#accountId = :accountId",
      ExpressionAttributeNames: {
        "#accountId": "accountId"
      },
      ExpressionAttributeValues: {
        ":accountId": pathParameters.accountId
      }
    };
    console.log("account query params", dbParams);

    const { Items } = await dynamoDBDoc.query(dbParams).promise();
    console.log("account query result", Items);

    if (!Items.length) {
      return response.serverErrorWithMessage("Account not found!");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(Items[0])
    };
  } catch (error) {
    return response.create(500, {
      error
    });
  }
};
