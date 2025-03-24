from models import Polygon
from contextlib import closing
import sqlite3
import json

sqlite_file_name = "database.db"


def insert_db():
    with open('script.sql', 'r') as sql_file:
        sql_script = sql_file.read()
    with closing(sqlite3.connect(sqlite_file_name, check_same_thread=False)) as conn:
        cursor = conn.cursor()
        cursor.executescript(sql_script)
        conn.commit()


def get_polygons():
    json_data = {}

    with closing(sqlite3.connect(sqlite_file_name, check_same_thread=False)) as conn:
        cursor = conn.cursor()
        data = cursor.execute("SELECT polygon_name, json(coordinates) FROM shapes as json_object;")
        conn.commit()
        for row in data:
            row_json = { row[0] : row[1] }
            json_data[row[0]] = row[1]
    return(json_data)

def update_coordinates(polygon: Polygon):
    new_coordinates = json.dumps({"coordinates": polygon.coordinates})
    with closing(sqlite3.connect(sqlite_file_name, check_same_thread=False)) as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE shapes SET coordinates = ? WHERE polygon_name = ?;", (new_coordinates, polygon.name))
        conn.commit()
        data = cursor.execute("SELECT polygon_name, json(coordinates) FROM shapes as json_object;")
        conn.commit()
        for row in data: print(row)
        #for row in data: print(row)
    return data

