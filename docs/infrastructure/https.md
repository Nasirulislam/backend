# Setup https

- Install Certbot

```
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install python-certbot-nginx
```

- Setup Nginx

```
$ sudo vim /etc/nginx/sites-available/default
```

```
# HTTP - redirect all traffic to HTTPS
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        return 301 https://$host$request_uri;
}

# HTTPS - proxy all request to our app
server {
        # Enable HTTP/2
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name [YOUR_DOMAIN_HERE]; # (ie api.whatever.com)

        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-NginX-Proxy true;
                proxy_pass http://localhost:3000/;
                proxy_ssl_session_reuse off;
                proxy_set_header Host $http_host;
                proxy_cache_bypass $http_upgrade;
                proxy_redirect off;
        }
}
```

- Verify configuration and reload

```
$ sudo nginx -t
$ sudo systemctl reload nginx
```

- Run certbox to create and configure the HTTPS certificate

```
$ sudo certbot --nginx -d [YOUR_DOMAIN_HERE]
```
Example:
> ie sudo certbot --nginx -d api.whatever.com

At the end you will get a message like:

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/[YOUR_DOMAIN_HERE]/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/[YOUR_DOMAIN_HERE]/privkey.pem
   Your cert will expire on 2019-01-24. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```


- Check that certbot created a systemd timer for renewal

```
$ systemctl list-timers
```
