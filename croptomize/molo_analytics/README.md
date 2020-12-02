# Modern Logic Analytics

Changes to the deployment requires the modern logic analytics repo be checked out peer to croptomize.

# Setting up

Call terraform init like so:

```
terraform init -backend-config="profile=Croptomize"
```

This assumes you have a profile in your ~/.aws/credentials named Croptomize.  This is used to read the s3 bucket that contains the terraform state.

```
terraform plan
```

shows you what needs to be done to deploy.

# What is provided

Modern logic analytics provides ECS computation resources and firehose Data streams that send data to S3. Amazon Athena and Amazon glue are used in conjunction with the ECS scheduled tasks to analyze events sent from Amazon pinpoint.
