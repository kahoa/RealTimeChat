#!/usr/bin/env sh
echo 'Creating JSON file from Terraform output'
terraform output -json > terraform_outputs.json
echo 'Copying JSON file to Ansible folder for further processing'
yes | cp terraform_outputs.json ../Ansible/
echo 'Creating Ansible inventory file'
echo "[webserver]" > ../Ansible/inventory.ini
echo "$(jq -r .ec2_public_dns.value < terraform_outputs.json) ansible_user=ec2-user ansible_ssh_private_key_file=../Terraform/terraform-key.pem" >> ../Ansible/inventory.ini
echo 'Extracting EC2 Public DNS and saving to .env'
echo "VITE_WS_SERVER=$(jq -r .ec2_public_dns.value < terraform_outputs.json)" > ../../frontend/.env

echo 'Done! The WebSocket server IP is now set in frontend/.env'
