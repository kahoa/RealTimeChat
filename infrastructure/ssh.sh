#!/usr/bin/env bash
ssh -i $(dirname -- "${BASH_SOURCE[0]}")/Terraform/terraform-key.pem ec2-user@$(jq -r .ec2_public_dns.value < $(dirname -- "${BASH_SOURCE[0]}")/Terraform/terraform_outputs.json)
