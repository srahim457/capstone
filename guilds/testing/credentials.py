import random , string
domains = [ "locust.hotmail.com", "locust.gmail.com", "locust.aol.com", "locust.mail.com" , "locust.mail.kz", "locust.yahoo.com"]
letters = string.ascii_lowercase[:26]

last_name = ''
first_name = ''
password = ''
def get_random_domain(domains):
    return random.choice(domains)

def get_random_name(letters, length):
    return ''.join(random.choice(letters) for i in range(length))

def make_random_first(letters,length):
    return ''.join(random.choice(letters) for i in range(length))
def make_random_last(letters,length):
    return ''.join(random.choice(letters) for i in range(length))
def make_random_password():
    return ''.join(random.choice(letters) for i in range(9))

def generate_random_emails(nb, length):
    last_name = make_random_last(letters,length)
    first_name = make_random_first(letters,length)
    return str([first_name + last_name + '@' + get_random_domain(domains) for i in range(nb)])

USER_CREDENTIALS = []