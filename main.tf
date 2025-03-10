provider "aws" {
<<<<<<< HEAD
  region  = "eu-central-1"
  profile = "default"
=======
  region = "eu-central-1"
>>>>>>> parent of a87ad12 (fix: Try to fix InvalidClientTokenId)
}
resource "aws_instance" "example" {
  ami           = "ami-0b74f796d330ab49c"
  instance_type = "t2.micro"

  tags = {
    Name = "MyFirstEC2Instance"
  }
}

