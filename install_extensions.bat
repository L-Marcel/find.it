@echo off
echo Installing all recommended VSCode extensions...

code --install-extension esbenp.prettier-vscode
code --install-extension stylelint.vscode-stylelint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension vscjava.vscode-java-pack
code --install-extension eamodio.gitlens
code --install-extension vmware.vscode-boot-dev-pack
code --install-extension PKief.material-icon-theme

echo All extensions installed successfully!
pause