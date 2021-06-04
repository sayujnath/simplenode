if [[ $(pm2 status | grep simplenode) ]] 
then
    pm2 stop "simplenode"
    pm2 delete "simplenode"
fi