# CI/CD Process in Chinook AWS Project

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) process implemented in the Chinook AWS project.

## Overview

The project uses GitHub Actions for CI/CD automation, with separate workflows for the backend and frontend components. The infrastructure is provisioned using Terraform on AWS.

## CI/CD Workflows

### Backend CI/CD

The backend CI/CD workflow is defined in `.github/workflows/backend-ci-cd.yml` and is triggered on:
- Push to the `main` branch (affecting backend code or the workflow file itself)
- Pull requests to the `main` branch (affecting backend code or the workflow file itself)

The workflow consists of two main jobs:

1. **Build Job**:
   - Checks out the code
   - Sets up JDK 17
   - Builds the Java application using Maven
   - Runs tests
   - Uploads the built JAR file as an artifact

2. **Deploy Job** (only runs on the `main` branch):
   - Configures AWS credentials using role-based authentication
   - Downloads the JAR artifact
   - Logs in to Amazon ECR (Elastic Container Registry)
   - Builds and tags a Docker image
   - Pushes the image to ECR with both the commit SHA and `latest` tags
   - Updates the ECS service to force a new deployment

### Frontend CI/CD

The frontend CI/CD workflow is defined in `.github/workflows/frontend-ci-cd.yml` and is triggered on:
- Push to the `main` branch (affecting frontend code or the workflow file itself)
- Pull requests to the `main` branch (affecting frontend code or the workflow file itself)

The workflow consists of two main jobs:

1. **Build Job**:
   - Checks out the code
   - Sets up Node.js 18
   - Installs dependencies
   - Runs tests
   - Builds the React application
   - Uploads the build artifacts

2. **Deploy Job** (only runs on the `main` branch):
   - Configures AWS credentials using role-based authentication
   - Downloads the build artifacts
   - Syncs the build files to an S3 bucket
   - Invalidates the CloudFront cache to ensure users get the latest version

## Infrastructure Components

The CI/CD process interacts with the following AWS infrastructure components:

### Backend Infrastructure
- **ECS Cluster**: Hosts the containerized backend application
- **ECR Repository**: Stores Docker images for the backend
- **ECS Service**: Manages the deployment of containers
- **ECS Task Definition**: Defines how the container should run
- **CloudWatch Logs**: Captures application logs

### Frontend Infrastructure
- **S3 Bucket**: Hosts the static frontend files
- **CloudFront Distribution**: Serves the frontend with caching and global distribution
- **CloudFront Origin Access Control**: Secures access to the S3 bucket

## Security Considerations

- AWS credentials are not stored in the repository
- GitHub Secrets are used to store sensitive information
- Role-based authentication is used for AWS access
- The CI/CD workflows use the principle of least privilege

## Deployment Flow

1. **Code Changes**:
   - Developers make changes and create pull requests
   - CI workflows run tests on pull requests

2. **Merge to Main**:
   - After approval, code is merged to the main branch
   - CI/CD workflows are triggered automatically

3. **Backend Deployment**:
   - Java application is built and tested
   - Docker image is created and pushed to ECR
   - ECS service is updated to use the new image

4. **Frontend Deployment**:
   - React application is built
   - Build files are uploaded to S3
   - CloudFront cache is invalidated

## Monitoring and Logging

- **CloudWatch**: Monitors ECS tasks and captures logs
- **GitHub Actions**: Provides workflow execution history and logs

## Rollback Process

In case of deployment issues:
- For backend: Revert to the previous image by updating the ECS service
- For frontend: Revert to the previous build by syncing the older version to S3 and invalidating CloudFront cache
