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
