PORT=13000 pm2 start /usr/local/share/applications/simplenode/app.js --name "simplenode"
pm2 save
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user