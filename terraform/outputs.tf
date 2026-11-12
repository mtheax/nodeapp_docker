output "instance_ip" {
  description = "Публічна IP-адреса EC2"
  value       = aws_instance.nodeapp.public_ip
}

output "ssh_command" {
  value = "ssh -i ${var.key_path} ubuntu@${aws_instance.nodeapp.public_ip}"
}
