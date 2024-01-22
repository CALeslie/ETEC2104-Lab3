import tornado.web
import random

users = {
    "alice":{
        "realname":"Alice Smith",
        "login":"alice",
        "dob":"Jan. 1",
        "email":"alice@example.com"
    },
    "bob":{
        "realname":"Bob Jones",
        "login":"bob",
        "dob":"Dec. 31",
        "email":"bob@bob.xyz"
    },
    "carol":{
        "realname":"Carol Ling",
        "login":"carol",
        "dob":"Jul. 17",
        "email":"alice@example.com"
    },
    "dave":{
        "realname":"Dave N. Port",
        "login":"dave",
        "dob":"Mar. 14",
        "email":"dave@dave.dave"
    }
}

class Handler(tornado.web.RequestHandler):
    def get(self):
        p = self.request.path
        p = p[9:] #strips /profile/ from path leaving just login
        self.render( "UsersTemplate.html", path=p, userData = users )

