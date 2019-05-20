from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import Mission_to_Mars

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/mission_to_mars")

@app.route("/")

def home():
    mars_data = mongo.db.mars_data.find_one()

    return render_template("index.html", mars_data=mars_data)

@app.route("/scrape")
def scrape():
     
     data = Mission_to_Mars.scrape()

     mongo.db.mars_data.update({}, data, upsert=True)

     return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)

