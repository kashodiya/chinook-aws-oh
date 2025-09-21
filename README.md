# Chinook Music Store

A cloud-native music browsing and purchasing application built on AWS.

## Overview
Chinook is a digital music store. It contains realistic data about customers, employees, music tracks, albums, artists, invoices, and playlists.

## Project Implementation

This implementation of the Chinook Music Store is built using:

- **Frontend**: React.js
- **Backend**: Java Spring Boot
- **Database**: PostgreSQL on RDS
- **Infrastructure**: Terraform on AWS

## Core Components

**Customer App/Website**
- Browse music by artist, album, or genre
- Search for songs
- Buy individual tracks or full albums
- Create and manage playlists
- View purchase history

**Admin Dashboard** (Future Implementation)
- Add new music (artists, albums, tracks)
- Set prices and manage inventory
- View sales reports
- Manage customer accounts
- Handle customer support

**Database**
- Store all music catalog information
- Keep customer data and purchase history
- Track inventory and sales

**Key Features:**
- Shopping cart functionality
- Secure payment processing (simulated)
- Responsive design for all devices

**Basic Flow:**
1. Customer browses music
2. Adds songs to cart
3. Pays for purchase
4. System tracks the sale and updates inventory

## Architecture Overview

Our implementation follows a modern cloud-native architecture on AWS:

### Frontend Layer
- **Amazon S3**: Hosts the React SPA static files
- **CloudFront**: CDN for global content delivery and caching
- **Application Load Balancer**: Routes traffic to backend services

### Backend Layer
- **ECS Fargate**: Containerized Java Spring Boot API
- **API Structure**:
  - `/api/artists/*` - Artist management
  - `/api/albums/*` - Album operations
  - `/api/tracks/*` - Track operations
  - `/api/genres/*` - Genre management

### Database Layer
- **Amazon RDS PostgreSQL**:
  - Stores music catalog data
  - Manages customer information
  - Tracks orders and purchases
  - Multi-AZ deployment for high availability

### Infrastructure Components
- **VPC**: Custom network with public and private subnets
- **Security Groups**: Controlled access to resources
- **IAM Roles**: Least privilege access for services
- **S3 Buckets**: Static content and asset storage

### CI/CD Pipeline
- **GitHub Actions**: Automated build and deployment
- **ECR**: Container registry for backend images
- **S3 Deployment**: Frontend static asset deployment

### Directory Structure
```
.
├── .github/workflows      # CI/CD pipeline configurations
├── backend                # Java Spring Boot API
├── frontend               # React.js frontend application
├── infrastructure         # Terraform IaC for AWS resources
└── database               # Database scripts and migrations
```

## Data Flow Examples

### Music Browse Flow
1. User visits S3-hosted website via CloudFront
2. Frontend calls backend API `/api/artists`
3. ECS Fargate container processes the request
4. Spring Boot service queries RDS PostgreSQL for artists data
5. Response returned through ALB to frontend
6. Album artwork loaded from placeholder images (future: S3 via CloudFront)

### Purchase Flow
1. User adds items to cart (frontend state)
2. User initiates checkout
3. Frontend processes order (simulated payment)
4. On success, order confirmation displayed
5. (Future implementation: Order recorded in PostgreSQL)

## Database Schema (PostgreSQL on RDS)

### Key Tables
- **artists** - Artist information
- **albums** - Album metadata
- **tracks** - Individual song details
- **genres** - Music genres
- **media_types** - Audio format types
- **customers** - Customer profiles
- **employees** - Staff information
- **invoices** - Purchase records
- **invoice_items** - Individual purchase items
- **playlists** - User-created playlists
- **playlist_track** - Songs in playlists

## Security Considerations

### Authentication & Authorization
- IAM roles for service permissions
- Security groups for network access control
- Environment variables for sensitive configuration

### Data Protection
- RDS encryption at rest
- S3 bucket encryption
- HTTPS/TLS for all communications
- VPC for database isolation

## Scalability Features

### Auto-scaling
- ECS Fargate tasks scale based on demand
- RDS can scale vertically as needed
- CloudFront global edge locations
- ALB handles traffic distribution

### Performance Optimization
- Connection pooling in Spring Boot
- CloudFront caching strategies
- Database query optimization
- Efficient containerization

## Deployment Strategy

### Infrastructure as Code
- **Terraform** for AWS resource provisioning
- **GitHub Actions** for CI/CD pipeline

### Environment Management
- Environment-specific configurations
- Container-based deployment for consistency

## Getting Started

### Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform installed
- Java 17 or higher
- Node.js 18 or higher
- Docker (optional for local development)

### Local Development

You can start both the frontend and backend with a single script:

```bash
./start-local-dev.sh
```

This will start:
- Backend at http://localhost:8080/api
- Frontend at http://localhost:51188

To stop the servers:
```bash
./stop-local-dev.sh
```

#### Manual Start

##### Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at http://localhost:8080/api

##### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will be available at http://localhost:51188

### Deployment

#### Infrastructure

```bash
cd infrastructure/terraform
terraform init
terraform apply
```

## Implementation Status

See [Implementation Summary](./docs/implementation-summary.md) for details on what has been implemented and next steps.

## Future Enhancements

1. User authentication system
2. Admin dashboard for content management
3. Real music file storage and streaming
4. Enhanced search capabilities
5. Playlist management features

