# Script pour lancer Terraform avec le binaire local (bin/terraform.exe)
# Usage: .\run.ps1 init | plan | apply | destroy | output

$ErrorActionPreference = "Stop"
$terraformDir = $PSScriptRoot
$terraformExe = Join-Path $terraformDir "bin\terraform.exe"

if (-not (Test-Path $terraformExe)) {
    Write-Host "Terraform non trouvé dans $terraformExe. Téléchargez-le depuis https://www.terraform.io/downloads ou installez via: winget install Hashicorp.Terraform"
    exit 1
}

$command = $args[0]
if (-not $command) {
    Write-Host "Usage: .\run.ps1 <init|plan|apply|destroy|output>"
    exit 1
}

Push-Location $terraformDir
try {
    & $terraformExe @args
} finally {
    Pop-Location
}
