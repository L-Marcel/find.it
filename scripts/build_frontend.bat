@echo off
echo Building frontend...
cd frontend
pnpm install
pnpm build
echo Build finished!