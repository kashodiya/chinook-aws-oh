provider "aws" {
  region = "us-east-1"
}

# Define variables
variable "project_prefix" {
  description = "Prefix for all resources"
  default     = "cao"
}

# VPC and Networking
module "vpc" {
  source = "./modules/vpc"
  project_prefix = var.project_prefix
}

# Database
module "database" {
  source = "./modules/database"
  project_prefix = var.project_prefix
  vpc_id = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_username = var.db_username
  db_password = var.db_password
  depends_on = [module.vpc]
}

# Application Load Balancer
module "alb" {
  source = "./modules/alb"
  project_prefix = var.project_prefix
  vpc_id = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  depends_on = [module.vpc]
}

# ECS Cluster for Backend API
module "ecs" {
  source = "./modules/ecs"
  project_prefix = var.project_prefix
  vpc_id = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  alb_target_group_arn = module.alb.target_group_arn
  db_host = module.database.db_endpoint
  db_name = module.database.db_name
  db_username = var.db_username
  db_password = var.db_password
  depends_on = [module.alb, module.database]
}

# S3 for Frontend
module "s3" {
  source = "./modules/s3"
  project_prefix = var.project_prefix
}

# CloudFront for Frontend
module "cloudfront" {
  source = "./modules/cloudfront"
  project_prefix = var.project_prefix
  s3_bucket_domain_name = module.s3.bucket_domain_name
  depends_on = [module.s3]
}

# Outputs
output "alb_dns_name" {
  value = module.alb.alb_dns_name
  description = "The DNS name of the load balancer"
}

output "cloudfront_domain_name" {
  value = module.cloudfront.cloudfront_domain_name
  description = "The domain name of the CloudFront distribution"
}

output "database_endpoint" {
  value = module.database.db_endpoint
  description = "The endpoint of the database"
}

# Sensitive variables (should be provided via environment variables)
variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}
