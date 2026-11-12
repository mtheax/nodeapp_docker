variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID (порожнє = остання Ubuntu 22.04)"
  type        = string
  default     = ""
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Назва Key Pair, створеного в AWS EC2 (Key Pairs)"
  type        = string
}

variable "key_path" {
  description = "Шлях до локального .pem файлу (для підказки SSH)"
  type        = string
  default     = "~/.ssh/my-key.pem"
}
