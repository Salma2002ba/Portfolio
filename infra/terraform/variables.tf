variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "app_name" {
  description = "Application name (used for resource naming)"
  type        = string
  default     = "portfolio"
}

variable "env" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "container_port" {
  description = "Port exposed by the container (80 for nginx placeholder; 3000 for Next.js app)"
  type        = number
  default     = 80
}

variable "desired_count" {
  description = "Number of ECS tasks to run"
  type        = number
  default     = 1
}

variable "cpu" {
  description = "CPU units for Fargate task (256 = 0.25 vCPU)"
  type        = number
  default     = 256
}

variable "memory" {
  description = "Memory in MB for Fargate task"
  type        = number
  default     = 512
}
