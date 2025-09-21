






output "cluster_id" {
  description = "The ID of the ECS cluster"
  value       = aws_ecs_cluster.main.id
}

output "service_name" {
  description = "The name of the ECS service"
  value       = aws_ecs_service.api.name
}

output "task_definition_arn" {
  description = "The ARN of the task definition"
  value       = aws_ecs_task_definition.api.arn
}






