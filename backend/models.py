from pydantic import BaseModel
from typing import List

class latLng(BaseModel):
    lat: float
    lng: float
    
class Polygon(BaseModel):
    name: str 
    coordinates: List[dict[str, float]]
