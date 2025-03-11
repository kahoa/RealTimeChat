# Deployment

Deployment is done with Terraform and Ansible.  
To keep connect the Terraform output to Ansible, a custom script called `terraform-output-to-json.sh` is used.  
The full deployment could look as follows:

```bash
cd Terraform
terraform apply -auto-approve
./terraform-output-to-json.sh
cd ../Ansible
ansible-playbook -i inventory.ini playbook.yml
```
