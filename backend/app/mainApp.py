from flask import request, jsonify
from config import app, db
from models import User
from models import Plant
from models import Cactus
from models import Sunflower
from models import Moonflower
from models import Cherryblossom
from models import Waterlily
from models import Activity

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))

    return jsonify({"users": json_users})

@app.route("/create_user", methods=["POST"])
def create_user():
    username = request.json.get("username")
    email = request.json.get("email")

    if not username or not email:
        return (
            jsonify({"message: Please include username and email"}), 
            400
        )
    
    new_user = User(username = username, email = email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created"}), 201

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": "User deleted"}), 200


@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)

    db.session.commit()

    return jsonify({"message": "User updated"}), 200

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/create_cactus", methods=["POST"])
def create_cactus():
    # Since name is the PK and is always "cactus" for a Cactus,
    # we can do:
    existing_cactus = Cactus.query.get("cactus")  
    if existing_cactus:
        # Already exists, so just return
        return jsonify({
            "message": "A cactus already exists.",
            "plant": existing_cactus.to_json()
        }), 200

    # Otherwise, create a new Cactus
    new_cactus = Cactus()  # defaults: age=20, status="healthy"
    db.session.add(new_cactus)
    db.session.commit()

    return jsonify({
        "message": "Cactus created.",
        "plant": new_cactus.to_json()
    }), 201
    
@app.route("/create_sunflower", methods=["POST"])
def create_sunflower():
    
    existing_sunflower = Sunflower.query.get("sunflower")  
    if existing_sunflower:
        # Already exists, so just return
        return jsonify({
            "message": "A sunflower already exists.",
            "plant": existing_sunflower.to_json()
        }), 200 

    new_sunflower = Sunflower()  # defaults: age=20, status="healthy"
    db.session.add(new_sunflower)
    db.session.commit()

    return jsonify({
        "message": "sunflower created.",
        "plant": new_sunflower.to_json()
    }), 201
    
@app.route("/create_moonflower", methods=["POST"])
def create_moonflower():
    
    existing_moonflower = Moonflower.query.get("moonflower")  
    if existing_moonflower:
        # Already exists, so just return
        return jsonify({
            "message": "A moonflower already exists.",
            "plant": existing_moonflower.to_json()
        }), 200 

    new_moonflower = Moonflower()  # defaults: age=20, status="healthy"
    db.session.add(new_moonflower)
    db.session.commit()

    return jsonify({
        "message": "moonflower created.",
        "plant": new_moonflower.to_json()
    }), 201
    
@app.route("/create_cherryblossom", methods=["POST"])
def create_cherryblossom():
    
    existing_cherryblossom = Cherryblossom.query.get("cherryblossom")  
    if existing_cherryblossom:
        # Already exists, so just return
        return jsonify({
            "message": "A cherry blossom already exists.",
            "plant": existing_cherryblossom.to_json()
        }), 200 

    new_cherryblossom = Cherryblossom()  # defaults: age=20, status="healthy"
    db.session.add(new_cherryblossom)
    db.session.commit()

    return jsonify({
        "message": "cherry blossom created.",
        "plant": new_cherryblossom.to_json()
    }), 201

@app.route("/create_waterlily", methods=["POST"])
def create_waterlily():
    
    existing_waterlily = Waterlily.query.get("waterlily")  
    if existing_waterlily:
        # Already exists, so just return
        return jsonify({
            "message": "A waterlily already exists.",
            "plant": existing_waterlily.to_json()
        }), 200 

    new_waterlily = Waterlily()  # defaults: age=20, status="healthy"
    db.session.add(new_waterlily)
    db.session.commit()

    return jsonify({
        "message": "water lily created.",
        "plant": new_waterlily.to_json()
    }), 201
    

@app.route("/update_plants", methods=["PATCH"])
def update_plants():
    data = request.get_json()
    did_workout = data.get("DidWorkoutToday")

    if did_workout is None:
        return jsonify({"error": "Must include DidWorkoutToday boolean"}), 400

    # Get all plants (cactus, sunflower, or any other type)
    all_plants = Plant.query.all()

    for plant in all_plants: 
        if did_workout:
            plant.age += plant.growth_per_day
        else:
            plant.age -= plant.loss_per_day

        # Example: clamp age to [0..100]
        if plant.age < 0:
            plant.age = 0
        if plant.age > 100:
            plant.age = 100

        # Optional: update status if age hits 0
        # if plant.age == 0:
        #    plant.status = "dead"
        if plant.age >= 15:
            plant.status = "healthy"
        if plant.age < 15:
            plant.status = "sick"
        if plant.age == 0:
            plant.status = "dead"
        
        db.session.add(plant)

    db.session.commit()

    updated_plants = [p.to_json() for p in all_plants]
    return jsonify({
        "message": "Plants updated",
        "plants": updated_plants
    }), 200

@app.route("/get_plants", methods=["GET"])
def get_plants():
    plants = Plant.query.all()
    json_plants = list(map(lambda x: x.to_json(), plants))

    return jsonify({"plants": json_plants})

@app.route("/delete_plants", methods=["DELETE"])
def delete_plants():
    plants = Plant.query.delete()

    db.session.commit()

    return jsonify({"message": "plants deleted"}), 201

@app.route("/add_activity", methods=["POST"])
def add_activity():
    time = request.json.get("time")
    date = request.json.get("date")
    distance = request.json.get("distance")
    
    new_activity = Activity(time = time, date = date, distance = distance)
    try:
        db.session.add(new_activity)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "activity created"}), 201

@app.route("/get_activities", methods=["GET"])
def get_activities():
    activities = Activity.query.all()
    json_activities = list(map(lambda x: x.to_json(), activities))

    return jsonify({"activities": json_activities})

@app.route("/delete_activities", methods=["DELETE"])
def delete_activities():
    activities = Activity.query.delete()

    db.session.commit()

    return jsonify({"message": "activities deleted"}), 201


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
