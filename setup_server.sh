sudo npm install -g pm2
cd $SERVER
cd /usr/local/shared/applications/simplenode
pm2 start app.js "simplenode"
