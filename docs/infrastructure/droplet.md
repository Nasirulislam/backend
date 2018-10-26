# Droplet setup

> The result of this configuration is the snapshot 'GZM-InitialSetup'

- Create new droplet
- Assign floating ip

## Initial setup

- Login as root

```
$ ssh root@[floating-ip]
```

- Create new user

```
# adduser [username]
```

- Verify user exists

```
# id [username]
```

- Add user to the sudo group

```
# usermod -aG sudo [username]
```

- Verify user is in sudo group

```
$ id [username]
```

- Change to the new user and prepare to login via ssh key
```
# su - [username]
$ mkdir ~/.ssh
$ chmod 700 ~/.ssh
$ touch ~/.ssh/authorized_keys # <---- Copy your pub ssh key here
```

- Check that login via ssh key with the new user works
```
$ ssh [username]@[floating-ip]
```

- Disable root login and login with password

```
$ sudo vim /etc/ssh/sshd_config

- Set 'PermitRootLogin' to no 
- Set 'PasswordAuthentication' to no

$ sudo systemctl reload ssh
```

- Check that login with root or password is not longer possible

- Configure firewall

```
$ sudo ufw allow OpenSSH
$ sudo ufw allow http
$ sudo ufw allow https
```

- Enable firewall and check status

```
$ sudo ufw enable
$ sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
80                         ALLOW       Anywhere
443                        ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
80 (v6)                    ALLOW       Anywhere (v6)
443 (v6)                   ALLOW       Anywhere (v6)
```

- Install git

```
$ sudo apt-get install git
```

- Install Docker

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt-get update
$ apt-cache policy docker-ce
$ sudo apt-get install -y docker-ce docker-compose
```

- Add user to the docker group

```
sudo usermod -aG docker [username]
```

- Start docker

```
sudo systemctl start docker
```