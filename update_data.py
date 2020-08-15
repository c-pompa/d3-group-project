# Dependencies
# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
# Go to existing database with automap_base
from sqlalchemy.ext.automap import automap_base
# Work through mapper to use python code
from sqlalchemy.orm import Session, relationship
# Inspect with python
from sqlalchemy import create_engine, inspect
# Allow us to declare column types
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

def update_weather(lat_search):
    # Sets an object to utilize the default declarative base in SQL Alchemy
    Base = declarative_base()
    ## Class base template to upload to sqlite
    class WeatherSeries(Base):
        __tablename__ = 'weatherSeries'

        id = Column(Integer, primary_key=True)
        city = Column(String(50))
        country = Column(String(200))
        region = Column(String(80))
        avgtemp = Column(Float)
        date = Column(String(12))
        date_epoch = Column(Float)
        maxtemp = Column(Float)
        mintemp = Column(Float)
        sunhour = Column(Float)
        totalsnow = Column(Float)
        uv_index = Column(Float)
        magnitude = Column(Float)
        place = Column(String(80))
        lat = Column(String(12))
        long = Column(String(12))

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
    # Create a Session Object to Connect to DB
    # ----------------------------------
    session = Session(bind=engine)

    def weatherTimeSeries(query_call):
        Base = automap_base()
        Base.prepare(engine, reflect=True)
        # Check db table names
        # Base.classes.keys()
        weather_table = Base.classes.weatherSeries
        weather_container = session.query(weather_table).filter(weather_table.lat == query_call).all()
        weather_data = []
        for data in weather_container:
            container = {
                "city": data.city, 
                "country": data.country, 
                "region": data.region, 
                "avgtemp": data.avgtemp, 
                "date": data.date, 
                "date_epoch": data.date_epoch, 
                "maxtemp": data.maxtemp, 
                "mintemp": data.mintemp, 
                "sunhour": data.sunhour, 
                "totalsnow": data.totalsnow, 
                "uv_index": data.uv_index, 
                "magnitude": data.magnitude, 
                "place": data.place, 
                "lat": data.lat, 
                "long": data.long
            }
            weather_data.append(container)
        return weather_data

    latitude = lat_search
    weather_data = weatherTimeSeries(latitude)

        
    # Return results
    return weather_data




#################################################################
## Facts 
##################################################################

def aboveSixQuakeCall():
    # Sets an object to utilize the default declarative base in SQL Alchemy
    Base = declarative_base()
    ## Class base template to upload to sqlite
    class WeatherSeries(Base):
        __tablename__ = 'weatherSeries'

        id = Column(Integer, primary_key=True)
        city = Column(String(50))
        country = Column(String(200))
        region = Column(String(80))
        avgtemp = Column(Float)
        date = Column(String(12))
        date_epoch = Column(Float)
        maxtemp = Column(Float)
        mintemp = Column(Float)
        sunhour = Column(Float)
        totalsnow = Column(Float)
        uv_index = Column(Float)
        magnitude = Column(Float)
        place = Column(String(80))
        lat = Column(String(12))
        long = Column(String(12))

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
    # Create a Session Object to Connect to DB
    # ----------------------------------
    session = Session(bind=engine)

    def aboveSixQuake():
        Base = automap_base()
        Base.prepare(engine, reflect=True)
        # Check db table names
        # Base.classes.keys()
        weather_table = Base.classes.weatherSeries
        weather_container = session.query(weather_table).filter(weather_table.magnitude > 6).all()
        weather_facts = []
        magnitude_list = []
        count = 0
        for data in weather_container:
            count += 1
            
            # make a list of magnitudes recorded greater than 6 and get avg temp
            magnitude_list.append(data.avgtemp)
            magnitude = data.magnitude
            magnitude_keep = 6
            # Get highest recorded earthquake
            if data.magnitude > magnitude_keep:
                magnitude_keep = data.magnitude
                location = data.country
                city = data.city
                temp_low = data.mintemp
                temp_high = data.maxtemp
                avg_temp_at_time = data.avgtemp
            else:
                continue
                
        # Get avgtemp from list        
        def Average(lst): 
            return sum(lst) / len(lst) 
        quake_avg = Average(magnitude_list)
        
        container = {
            "count": count, 
            "avgtemp": quake_avg,
            "highest_magnitude": magnitude_keep, 
            "highest_city": city,
            "highest_location": location,
            "temp_low": temp_low,
            "temp_high": temp_high,
            "avg_temp_at_time": avg_temp_at_time,
            
            
        }
        weather_facts.append(container)
        return weather_facts

    weather_facts = aboveSixQuake()

    # Return results
    return weather_facts

