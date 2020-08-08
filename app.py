import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from data.py.classes_app import createWeatherClass,createEarthquakeClass
import os
from flask import Flask, jsonify, render_template,request,redirect

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Database Setup
# #################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///earthquake_weather.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# group_project_db = createWeatherClass(db)


# engine = create_engine("sqlite:///earthquake_weather.sqlite")
# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)
# # Save reference to the table
# Measurement = Base.classes.measurement
# Station = Base.classes.station


#################################################
# Flask Routes
#################################################

@app.route("/")
#   * Home page.
def home():
    """Render Index.html"""
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
