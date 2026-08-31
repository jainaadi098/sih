from datetime import datetime
from pydantic import BaseModel

class user(BaseModel):
    id: int
    name: str
    signup_ts: datetime | None = None
    friends: list[int] = []

external_data = {
    "id": 123,
    "name": "Jhon",
    "signup_ts": "2023-10-05 14:48:00",
    "friends": [1, 2, 3, 4, 5],
}

user = user(**external_data)
print(user)
print(user.id)