sudo docker run -d -p 8012:80 -v /home/pivx/go/src/blockbook/games/stockfish-chess/test/nginx.conf:/etc/nginx/nginx.conf nginx

sudo docker run -d --network host -v /home/pivx/go/src/blockbook/games/stockfish-chess/test/nginx.conf:/etc/nginx/nginx.conf nginx

