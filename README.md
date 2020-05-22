# capstone

git clone https://github.com/srahim457/capstone.git

Running this project requires Node.js & Node Package Manager: https://www.npmjs.com/get-npm

*	Switch to master branch (if not already there) <br/>
```
$ git checkout master
$ git pull
```

*	in guilds directory run <br/>
`$ npm install` 

* create a .env file and place it in `/app` directory 

* copy & paste contents below into .env
```
EMAIL_ADDRESS = guildspsw@gmail.com
EMAIL_PASSWORD = Guilds123
DATABASE = d6cenb67ftrj7i
DATABASE_URL = postgres://imgayjgdlaymzf:37654a11f31d3d6b15640a6c34a8e09268d91bf1ca20b379c8e60f0b4b3f79f4@ec2-52-23-14-156.compute-1.amazonaws.com:5432/d6cenb67ftrj7i
HOST = ec2-52-23-14-156.compute-1.amazonaws.com
NPM_CONFIG_PRODUCTION = false
PASSWORD = 37654a11f31d3d6b15640a6c34a8e09268d91bf1ca20b379c8e60f0b4b3f79f4
USER = imgayjgdlaymzf
```
* go to `/app` directory and run in terminal: <br/>`$ nodemon server.js`

* Startup another terminal, go to `/guilds` directory, and run: <br/> `$ npm start`

* Any missing Node.js module error can be installed by:
`$ npm install module_name_1 module_name_2 module_name_3`
