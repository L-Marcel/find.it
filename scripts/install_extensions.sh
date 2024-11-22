#!/bin/bash
echo "Installing all recommended VSCode extensions..."

code --install-extension esbenp.prettier-vscode --force
code --install-extension stylelint.vscode-stylelint --force
code --install-extension bradlc.vscode-tailwindcss --force
code --install-extension vscjava.vscode-java-pack --force
code --install-extension eamodio.gitlens --force
code --install-extension vmware.vscode-boot-dev-pack --force
code --install-extension PKief.material-icon-theme --force

echo "All extensions installed successfully!"