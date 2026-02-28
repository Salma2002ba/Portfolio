# ECS cluster + task definition (placeholder image) + Fargate service

resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-${var.env}-cluster"
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app_name}-${var.env}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory

  execution_role_arn = aws_iam_role.ecs_execution.arn
  task_role_arn      = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name  = var.app_name
      image = "public.ecr.aws/docker/library/nginx:alpine"
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
      # Placeholder: nginx listens on 80. For real app (port 3000), replace image with ECR app image and set container_port=3000.
    }
  ])
}

# Fargate service: public IP, linked to ALB target group
resource "aws_ecs_service" "app" {
  name            = "${var.app_name}-${var.env}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = var.app_name
    container_port   = var.container_port
  }
}
