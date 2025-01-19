from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), unique = False, nullable = False)
    email = db.Column(db.String(50), unique = True, nullable = False)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    time = db.Column(db.Integer, primary_key = False) #in seconds
    date = db.Column(db.String(20), unique = False, nullable = False)
    distance = db.Column(db.Integer, primary_key = False) #in meters
    
    def to_json(self):
        return {
            "id": self.id,
            "time": self.time,
            "date": self.date,
            "distance": self.distance
        }
    
class Plant(db.Model):
    __tablename__ = "plants"
    
    name = db.Column(db.String(20), primary_key = True, nullable = False)
    growth_per_day = db.Column(db.Integer, nullable=False) # 4 == grows 4 age units per 1 day of acitivity.  
    loss_per_day = db.Column(db.Integer, nullable=False) # 2 == loses 2 age units per 1 day of activity.
    age = db.Column(db.Integer, nullable=False) #[0, 100]
    status = db.Column(db.String(40), nullable=False) # "health", "sick", "dead"
    rarity = db.Column(db.Integer, nullable=False) # [1,5] 5 is rarest.
    
    __mapper_args__ = {
        "polymorphic_identity": "plant",
        "polymorphic_on": name
    }

    def to_json(self):
        return {
            "name": self.name,
            "growth_per_day": self.growth_per_day,
            "loss_per_day": self.loss_per_day,
            "age": self.age,
            "status": self.status,
            "rarity": self.rarity
        }
        
class Cactus(Plant):
    __mapper_args__ = {
        "polymorphic_identity": "cactus",
    }

    def __init__(self, age=20, status="healthy", **kwargs):

        super().__init__(**kwargs)

        # Fixed / forced fields:
        self.name = "cactus"
        self.growth_per_day = 5
        self.loss_per_day = 1
        self.rarity = 1

        # Defaults that can be changed after creation
        self.age = age
        self.status = status


class Sunflower(Plant):
    __mapper_args__ = {
        "polymorphic_identity": "sunflower",
    }

    def __init__(self, age=20, status="healthy", **kwargs):

        super().__init__(**kwargs)

        # Fixed / forced fields:
        self.name = "sunflower"
        self.growth_per_day = 3
        self.loss_per_day = 1
        self.rarity = 2

        # Defaults that can be changed after creation
        self.age = age
        self.status = status

class Moonflower(Plant):
    __mapper_args__ = {
        "polymorphic_identity": "moonflower",
    }

    def __init__(self, age=20, status="healthy", **kwargs):

        super().__init__(**kwargs)

        # Fixed / forced fields:
        self.name = "moonflower"
        self.growth_per_day = 4
        self.loss_per_day = 3
        self.rarity = 3

        # Defaults that can be changed after creation
        self.age = age
        self.status = status

class Cherryblossom(Plant):
    __mapper_args__ = {
        "polymorphic_identity": "cherryblossom",
    }

    def __init__(self, age=20, status="healthy", **kwargs):

        super().__init__(**kwargs)

        # Fixed / forced fields:
        self.name = "cherryblossom"
        self.growth_per_day = 3
        self.loss_per_day = 5
        self.rarity = 4

        # Defaults that can be changed after creation
        self.age = age
        self.status = status

class Waterlily(Plant):
    __mapper_args__ = {
        "polymorphic_identity": "waterlily",
    }

    def __init__(self, age=20, status="healthy", **kwargs):

        super().__init__(**kwargs)

        # Fixed / forced fields:
        self.name = "waterlily"
        self.growth_per_day = 2
        self.loss_per_day = 5
        self.rarity = 5

        # Defaults that can be changed after creation
        self.age = age
        self.status = status
