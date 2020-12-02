# Description

This sub-project contains a set of lambdas to:

1. copy the CME group ftp files to s3
2. update the Croptomize database with those files similar to the old 1_SF_Data_Load_Ctrl.PY -INCR_CME command. (Incremental CME update, only the latest files)

# Installation

1. Download and install nodejs and npm: `https://nodejs.org/en/`
2. Install the serverless framework `npm install -g serverless`
3. run `serverless deploy -f function_name` or `serverless deploy --stage prod -f function_name` to deploy new code. Replace function_name with the function name from serverless.yml.

The deploys in step 3 do not deploy the cloudformation stack (e.g. everything besides the function). To deploy everything leave off the `-f function_name` from the commands. This is considerably slower.

# Testing

1. Ensure that you have a Croptomize AWS profile: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html and that your user has s3 permissions.
2. If you are testing a function that requires MySQL run `docker-compose up` and use a database tool or cli to import the files in daily_import/database before starting. Connection information is in docker-compose.yml, use the 'root' user for setup. Import the structure.sql file and then the setup file. The first one sets up the tables, the second one populates the static data.
3. Run the relevant test comand, e.g: `npm run test_copy_files`. See package.json for a list.


