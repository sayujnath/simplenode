cd $SERVER
cd /usr/local/shared/applications/simplenode
PORT=14000 pm2 start app.js "simplenode"
pm2 startup