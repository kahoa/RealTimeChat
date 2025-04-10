# Installation in AWS

Die Installation auf AWS ist komplett automatisiert über Terraform und Ansible.  
Um die Ausgaben von Terraform (die Informationen zur erstellten EC2-Instanz) für Ansible bereitzustellen und das Frontend mit dem Backend zu verbinden, kann man das beiliegende Skript `Terraform/terraform-output-to-json.sh` nutzen (benötigt `jq`).  
Die komplette Installation könnte folgendermaßen aussehen:

```bash
cd Terraform
terraform apply -auto-approve
./terraform-output-to-json.sh
cd ../Ansible
ansible-playbook -i inventory.ini playbook.yml
```

[![RealTimeChat Deployment](https://img.youtube.com/vi/_ZwR-pFpX_8/0.jpg)](https://www.youtube.com/watch?v=_ZwR-pFpX_8)

Für Debug-Zwecke kann das Skript `ssh.sh` genutzt werden, um sich per SSH auf die EC2-Instanz zu verbinden (benötigt `jq`).
