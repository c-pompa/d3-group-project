# Dependencies
# ----------------------------------
# Imports the method used for connecting to DBs
from sqlalchemy import create_engine
# Imports the methods needed to abstract classes into tables
from sqlalchemy.ext.declarative import declarative_base
# Allow us to declare column types
from sqlalchemy import Column, Integer, String, Float 

# Create Weather and Earthquake Classes
# ----------------------------------
# Sets an object to utilize the default declarative base in SQL Alchemy
Base = declarative_base()


# Creates Classes which will serve as the anchor points for our Tables
class Weather(Base):
    __tablename__ = 'weather'
    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lon = Column(Float)
    date = Column(Integer)
    earthquake_id = Column(Integer)
    location = Column(String(60))
    weather_con = Column(String(60))
    temp = Column(Float)

class Earthquake(Base):
    __tablename__ = 'earthquake'
    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lon = Column(Float)
    date = Column(Integer)
    mag = Column(Float)
    location = Column(String(255))

#########################################
## Function Calls for app.py
#########################################
def createWeatherClass(db):
    class Weather(db.Base):
        __tablename__ = 'weather'
        id = Column(db.Integer, primary_key=True)
        lat = Column(db.Float)
        lon = Column(db.Float)
        date = Column(db.Date)
        earthquake_id = Column(db.Integer)
        location = Column(db.String(60))
        weather_con = Column(db.String(60))
        temp = Column(db.Float)

def createEarthquakeClass(db):
    class Earthquake(db.Base):
        __tablename__ = 'earthquake'
        id = Column(Integer, primary_key=True)
        lat = Column(db.Float)
        lon = Column(db.Float)
        date = Column(db.Date)
        mag = Column(db.Float)
        location = Column(db.String(255))

# test example
# # Define the Surfer Class
# # inherit
# class ProSurfer(Surfer):

#   # Initialize the Surfer constructor 
#   def __init__(self, name, hometown, rank, sponsors):
#       self.name = name + " " + "Dude"
#       self.hometown = hometown + " " + "Waves"
#       self.rank = rank
#       self.sponsors = sponsors



# Create a Specific Instance of the "weather_data" and "earthquake_data" classes
# ----------------------------------
# Calls the Constructors to create "weather_data" and "earthquake_data" objets
weather_data = Weather(
    lat = '',
    lon = '',
    date = '',
    earthquake_id = '',
    location = '',
    weather_con = '',
    temp = ''
    )

earthquake_data = Earthquake(
    lat = '',
    lon = '',
    date = '',
    mag = '',
    location = ''
    )

# Create Database Connection
# ----------------------------------
# Creates a connection to our DB
# Engine opens the door. Conn is the walk through sign
engine = create_engine("sqlite:///earthquake_weather.sqlite")
conn = engine.connect()

# Create a "Metadata" Layer That Abstracts our SQL Database
# ----------------------------------
# Create (if not already in existence) the tables associated with our classes.
Base.metadata.create_all(engine)

# Use this to clear out the db
# ----------------------------------
# Base.metadata.drop_all(engine)

# Create a Session Object to Connect to DB
# ----------------------------------
# Session is a temporary binding to our DB
# Session is the messanger-- allows to walk through the door
from sqlalchemy.orm import Session
session = Session(bind=engine)

# Add Records to the Appropriate DB
# ----------------------------------
# Use the SQL ALchemy methods to run simple "INSERT" statements using the classes and objects  
session.add(weather_data)
session.add(earthquake_data)
session.commit()


# Query the Tables
# ----------------------------------
# Perform a simple query of the database
# weather_list = session.query(Weather)
# for weather in weather_list:
#     print(weather.name)

# earthquake_list = session.query(Earthquake)
# for quake in earthquake_list:
#     print(quake.name)