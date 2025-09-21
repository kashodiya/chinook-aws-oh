# Chinook digital music store.

## Overview
Chinook is a digital music store. It contains realistic data about customers, employees, music tracks, albums, artists, invoices, and playlists.

## System details
**Core Components:**

**Customer App/Website**
- Browse music by artist, album, or genre
- Search for songs
- Buy individual tracks or full albums
- Create and manage playlists
- View purchase history

**Admin Dashboard**
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
- User accounts with login.
- Shopping cart functionality

**Basic Flow:**
1. Customer browses music
2. Adds songs to cart
3. Pays for purchase
4. Downloads or streams music
5. System tracks the sale and updates inventory

In short the customers can discover, buy, and enjoy digital music while the business tracks everything behind the scenes.

# Chinook Digital Music Store - AWS Implementation Design

## Architecture Overview

### Frontend Layer
**Amazon S3 + CloudFront**
- **S3 Buckets:**
  - `chinook-web-static`: Hosts React/Angular SPA files (HTML, CSS, JS)
  - `chinook-music-files`: Stores audio files (MP3, FLAC, etc.)
  - `chinook-album-artwork`: Stores cover art and images
- **CloudFront CDN:** Global content delivery for fast loading
- **Route 53:** DNS management and custom domain

### API Gateway Layer
**Amazon API Gateway (REST API)**
- **Endpoints Structure:**
  - `/api/v1/music/*` - Music catalog operations
  - `/api/v1/customers/*` - Customer management
  - `/api/v1/orders/*` - Order processing
  - `/api/v1/playlists/*` - Playlist operations
  - `/api/v1/admin/*` - Admin operations

### Business Logic Layer (AWS Lambda Functions)

#### Music Catalog Service
- **Function:** `chinook-music-service`
- **Responsibilities:**
  - Get artists, albums, tracks
  - Search functionality
  - Genre and media type management
  - Music metadata operations

#### Customer Service
- **Function:** `chinook-customer-service`
- **Responsibilities:**
  - User registration/login
  - Profile management
  - Authentication with JWT tokens
  - Customer preferences

#### Order Service
- **Function:** `chinook-order-service`
- **Responsibilities:**
  - Shopping cart management
  - Invoice creation
  - Payment processing integration
  - Purchase history

#### Playlist Service
- **Function:** `chinook-playlist-service`
- **Responsibilities:**
  - Create/update/delete playlists
  - Add/remove tracks from playlists
  - Share playlist functionality

#### Admin Service
- **Function:** `chinook-admin-service`
- **Responsibilities:**
  - Employee management
  - Sales reporting
  - System administration
  - Content management

### Database Layer
**Amazon RDS PostgreSQL**
- **Configuration:**
  - Multi-AZ deployment for high availability
  - Read replicas for improved performance
  - Automated backups and snapshots
- **Connection:** Lambda functions connect via RDS Proxy for connection pooling

### Additional AWS Services

#### Security & Authentication
- **AWS Cognito:** User authentication and authorization
- **AWS IAM:** Role-based access control
- **AWS Secrets Manager:** Database credentials and API keys

#### Payment Integration
- **AWS Lambda:** Integration with Stripe/PayPal APIs
- **AWS SQS:** Queue payment processing tasks
- **AWS SNS:** Payment notifications and receipts

#### Monitoring & Logging
- **CloudWatch:** Application logs and metrics
- **X-Ray:** Distributed tracing
- **CloudTrail:** API call auditing

#### File Processing
- **AWS Lambda:** Audio file processing and metadata extraction
- **AWS MediaConvert:** Audio format conversion if needed

## Data Flow Examples

### Music Browse Flow
1. User visits S3-hosted website via CloudFront
2. Frontend calls API Gateway `/api/v1/music/artists`
3. API Gateway triggers `chinook-music-service` Lambda
4. Lambda queries RDS PostgreSQL for artists data
5. Response returned through API Gateway to frontend
6. Album artwork loaded from S3 via CloudFront

### Purchase Flow
1. User adds items to cart (frontend state)
2. User initiates checkout → API Gateway `/api/v1/orders/create`
3. `chinook-order-service` Lambda processes order
4. Payment integration via external API (Stripe)
5. On success, order recorded in PostgreSQL
6. Customer receives download links to S3 music files
7. Email notification via SES

### Admin Dashboard Flow
1. Admin authenticates via Cognito
2. Admin dashboard (S3-hosted) calls `/api/v1/admin/*` endpoints
3. `chinook-admin-service` Lambda handles requests
4. Data retrieved from PostgreSQL and returned
5. Reports generated and displayed

## Database Schema (PostgreSQL on RDS)

### Key Tables
- **artists** - Artist information
- **albums** - Album metadata
- **tracks** - Individual song details
- **customers** - Customer profiles
- **employees** - Staff information
- **invoices** - Purchase records
- **invoice_lines** - Individual purchase items
- **playlists** - User-created playlists
- **playlist_tracks** - Songs in playlists

## Security Considerations

### Authentication & Authorization
- Cognito handles user authentication
- JWT tokens for API access
- IAM roles for Lambda function permissions
- API Gateway request validation

### Data Protection
- RDS encryption at rest
- S3 bucket encryption
- HTTPS/TLS for all communications
- VPC for database isolation

### Access Control
- Pre-signed URLs for music file downloads
- Time-limited download links
- Geographic content restrictions if needed

## Scalability Features

### Auto-scaling
- Lambda functions scale automatically
- RDS read replicas for database scaling
- CloudFront global edge locations
- API Gateway built-in scaling

### Performance Optimization
- Lambda connection pooling via RDS Proxy
- CloudFront caching strategies
- Database query optimization
- S3 Transfer Acceleration for uploads

## Deployment Strategy

### Infrastructure as Code
- **AWS CDK/CloudFormation** for resource provisioning
- **AWS SAM** for Lambda deployment
- **CI/CD Pipeline** using CodePipeline and CodeBuild

### Environment Management
- Separate environments: dev, staging, production
- Environment-specific configurations
- Blue/green deployment for zero downtime

## Cost Optimization

### Serverless Benefits
- Pay-per-request Lambda pricing
- No idle server costs
- Automatic scaling reduces over-provisioning
- S3 storage classes for different access patterns


