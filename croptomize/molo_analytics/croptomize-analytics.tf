provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

terraform {
  backend "s3" {
    bucket = "croptomize-analytics-terraform"
    key = "backend"
    region = "us-east-1"
  }
}

module "modern-logic-analytics" {
  source = "../../modern-logic-analytics/terraform"
  app_name = "${var.app_name}"
  environment = "production"
  bucket_name = "${var.app_name}-analytics-production"
  athena_query_bucket_name = "${var.app_name}-analytics-query-results-production"
  database_name = "${var.app_name}_production"
  slack_oauth = "${var.slack_oauth}"
  app_id = "${var.production_app_id}"
}
