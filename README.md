# Guilds
Guilds is a web application that hosts a community for Marketplace transactions and Chatting. The Marketplace is for lending, borrowing, buying, selling, and renting personal items from other users. Chat is how users can communicate with each other through text channels.

Guilds was created as a senior Capstone project.<br/>

## Preview
![Guilds Landing](/Guilds_Landing_Page.png)


## How to run locally

Running this project requires Node.js & Node Package Manager: https://www.npmjs.com/get-npm

### 1. Clone this project <br/>
`git clone https://github.com/srahim457/capstone.git`

### 2.	Switch to master branch (if not already there) <br/>
```
$ git checkout master
$ git pull
```

### 3. In `/guilds` directory run <br/>
`$ npm install` 

### 4. Create a `.env` file and place it in `/app` directory 

   copy & paste contents below into `.env`
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

### 5. Open up 2 terminals
#### Terminal 1
go to `/app` directory and run in terminal: <br/>`$ nodemon server.js`

#### Terminal 2
go to `/guilds` directory, and run: <br/> `$ npm start`

<br/><br/>

### Missing modules?
Any missing Node.js module error can be installed by: <br/>
`$ npm install module_name_1 module_name_2 module_name_3`
