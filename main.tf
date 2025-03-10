provider "aws" {
    region = "eu-central-1"
}
resource "aws_instance" "example" {
    ami = "ami-0b74f796d330ab49c"
    instance_type = "t2.micro"

    tags = {
        Name = "MyFirstEC2Instance"
        }
    }

