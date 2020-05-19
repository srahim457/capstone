from locust import HttpLocust, TaskSet, task
import json, csv
from credentials import *

class UserBehavior (TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before 
            any task is scheduled        """

        self.token = ""
        self.headers = {}
        # Get all credentials from a file
        if len (USER_CREDENTIALS) > 0:
            print('current user credentials list', USER_CREDENTIALS)
            self.email,self.password = USER_CREDENTIALS.pop()
        else:
            print('ran out of valid credentials',USER_CREDENTIALS)
            print('after signup ', self.signup(),self.email,self.password)
            
        self.token = self.login()    
        self.headers = {'X-Auth-Token': self.token.get('token')}
        
    def signup(self):
        random_email = generate_random_emails(1,3)
        self.email = random_email[2:-2]
        self.password = make_random_password()
        print('signing up with',self.email,self.password)
        with open('generatedlogins.csv',mode = 'a') as newlogins:
                login_writer = csv.writer(newlogins,delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                login_writer.writerow(["('"+self.email,"'" +self.password+"'"+'),'])
        response = self.client.post("/signup",
                        {"email":self.email,
                        "password":self.password,
                       "firstname":'locust first',
                      "lastname":"locust last"})
        return str(response._content) 
    def login(self):
        print('Logging in with %s email and  %s password', self.email,self.password)
        response = self.client.post("/auth",
                         {"email":self.email,
                          "password":self.password})
        return json.loads(response._content)
    @task(4)
    def allguilds(self):
        response = self.client.get("/all-guilds", headers=self.headers)
    @task(3)
    def marketplace(self):
        response = self.client.get("/market-place", headers=self.headers)        
    @task(2)
    def index(self):
        self.client.get("/", headers=self.headers)
    @task(1)
    def profile(self):
        response = self.client.get("/profile", headers=self.headers)
        
class WebsiteUser(HttpLocust):    
    task_set = UserBehavior
    min_wait = 1000
    max_wait = 1200

class Storage(object):
    def __init__(self):
        self.cookie = None