"use strict";

const response = require("../../application/response");
const db = require("../../application/db");
const { DynamoDB } = require("aws-sdk");
const uuid = require("uuid/v4");
const lodashGet = require("lodash/get");

const dynamoDBDoc = new DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);

    var params = {
      TableName: db.tables.account.tableName,
      Item: {
        accountId: uuid(),
        cratedAt: new Date().toISOString(),
        email: body.email,
        fullName: body.fullName
      }
    };
    console.log("account insert params", params);

    const result = await dynamoDBDoc.put(params).promise();
    console.log("account insert result", result);

    return {
      statusCode: 200,
      body: ""
    };
  } catch (error) {
    return response.create(500, {
      error
    });
  }
};
