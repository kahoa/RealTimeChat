provider "aws" {
  region = "eu-central-1"
}

# Create a security group
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow inbound SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from any IP address (replace with your IP for more security)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"] # Allow outbound traffic to anywhere
  }

  tags = {
    Name = "AllowSSH"
  }
}

# Create a SSH key pair
resource "tls_private_key" "example" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = "terraform-key"
  public_key = tls_private_key.example.public_key_openssh
}

resource "local_file" "private_key" {
  content         = tls_private_key.example.private_key_pem
  filename        = "${path.module}/terraform-key.pem"
  file_permission = "0600"
}

# Launch EC2 instance and attach the security group
resource "aws_instance" "example" {
  ami           = "ami-0b74f796d330ab49c"
  instance_type = "t2.micro"

  security_groups = [aws_security_group.allow_ssh.name] # Attach the security group

  key_name = aws_key_pair.generated_key.key_name # Attach the SSH key pair

  tags = {
    Name = "MyFirstEC2Instance"
  }
}

