
- Use Java for programming language
- Use terrafrom to build the infrastructure
- Use React framework for frontend development. Do not use CloudFormation. 
- Do not implement real payment feature. Implement a dummy payment processing. 
- Do not register real DNS name. Use the out of the box DNS created by AWS. Instead of that just use Elastic Load Balancer (ELB).
- Use us-east-1 region.
- Do not store sensitive details like AWS Account number, token, secrets in the code repo. Always use environment variables to keep sensitive information. 
- Assume that the development environment already have access to the AWS resources.