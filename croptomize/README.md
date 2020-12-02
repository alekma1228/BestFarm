# croptomize

> Modern Logic Croptomize

## Description

Croptomize is a comprehensive tool that takes the guess work out of grain hedging

This generator was built with Modern Logic mlproto.

Read the [Yeoman](http://yeoman.io) documentation for info on how to customize this generator.

## Getting a Modern Logic Developer AWS Account - READ ME FIRST

Each developer will be provided with an AWS account under the Modern Logic Organization for development. The account is per developer, not per project. If you have multiple Modern Logic projects you should re-use the same development account. If you've already got an account from a different project you can skip to 'Setting up...' below.

If you have not worked with a Modern Logic Developer AWS account before:

1. Get account credentials from your development lead
2. Add them to ~/.aws/credentials in the following format:

[ModernLogicDevelopment]
aws_access_key_id=YOURACCESSKEYID
aws_secret_access_key=YOURSECRETACCESSKEY

3. Add the following to ~/.aws/config:

[profile ModernLogicDevelopment]
region=us-east-1

4. then login to the aws console using a web browser and a link your dev lead will provide. It will ask you to change the password. Do so.
5. Visit https://console.aws.amazon.com/iam/home?region=us-east-2#/users/YOURUSERNAME?section=security_credentials and add an MFA token. You can use a program like google authenticator on your phone or 1password for One Time Tokens.

## Setting up this project with AWS Amplify - READ ME SECOND

Once the above is completed you can get started with your development environment.

1. Checkout the project from github.
2. Install the AWS Amplify CLI (`npm install -g @aws-amplify/cli`).
3. Run `amplify env add` with the following answers:

environment name: yournamedev (for example: dylandev)
Do you want to use an AWS profile: Yes
Choose a profile: Choose ModernLogicDevelopment

This will create some resources in your AWS account.

4. amplify push

This will deploy the backend resources. Running the app at this point will run against your dev environment.

## Installation

Make sure your version of [yarn](https://www.yarnpkg.com/) is up to date:

```
brew upgrade yarn

```

## Development

First, follow the instructions above to setup a development amplify environment.

```bash
cd croptomize
```

Build and run from Xcode or:

```
yarn ios
```

To run against a local mock environment while developing remote apis:

`yarn mock`

Then reload the app.

This will start a local dynamodb database and graphql endpoint and update the aws-exports file temporarily so that the app will run against a local environment.

## Story Book

One Time: Enable storybook mode on your iOS Simulator by clicking this [link](croptomize://debug?storybook=YES).

Story book lets you preview screens of the app in isolation.

Run:

```
yarn storybook
```

and then follow the instructions. It should tell you open your [browser](http://localhost:7007).

## Production Environment Deployment Notes

Ignore these if you're not deploying to new production environment.

Then make sure to update the environment variables for the `croptomizeiosanalyticsPostConfirmation` lambda function via the console. The mailchimp api key and audience id must be set.

## Tips

## Common Issues

- After running from Xcode, if the app doesn't work

  1.) Try closing the Terminal window running the Metro bundler, and then re-run from Xcode.

  2.) Try doing a clean build in Xcode and then build-and run

  3.) Try running `yarn` again to install any new dependencies

  4.) Try running `react-native link` to link in any new dependencies

## License

© [Modern Logic](http://modernlogic.io)
