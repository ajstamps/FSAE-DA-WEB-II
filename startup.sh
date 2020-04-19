echo "=== STARTUP INFO ================================================="
echo "Welcome to the FSAE-DA-WEB application docker container."
echo "The server is currently running the listed versions of each software."
echo ""
echo "FSAE-DA-WEB version: [$( node -pe "require('./FSAE-DA-WEB/package.json').version" )]"
echo "Node version: [$( npm --version )]"
echo "NPM version: [$( node --version )]"
echo ""
echo "OS Distribution:"
echo "$(cat /etc/os-release)"
echo "=================================================================="

apache2ctl -D FOREGROUND