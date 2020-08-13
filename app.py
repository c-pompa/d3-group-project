import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from data.py.classes_app import createWeatherClass,createEarthquakeClass
import os
from flask import Flask, jsonify, render_template,request,redirect
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Database Setup
# #################################################

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///data/py/earthquake_weather.sqlite"

# # Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# group_project_db = createWeatherClass(db)

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/py/earthquake_weather.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
weather_earthquake = Base.classes.weatherSeries


#################################################
# Flask Routes
#################################################

@app.route("/")
#   * Home page.
def home():

# Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates and prcp measurements from Measurement table"""
    # Query all date and prcp measurements
    results = session.query(weather_earthquake.date, weather_earthquake.maxtemp).all()

    session.close()

    # Create a dictionary from the row data and append to a list of date_prcp_data
    date_prcp_data = []
    for datee, prcpp in results:
        date_prcp_dict = {}
        date_prcp_dict[datee] = prcpp
        date_prcp_data.append(date_prcp_dict)

    print(date_prcp_data)
    # return jsonify(date_prcp_data)



    """Render Index.html"""
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
