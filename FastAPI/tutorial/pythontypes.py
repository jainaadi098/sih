def add(firstname:str | list,lastname):
    firstname=firstname.capitalize()
    return firstname + " " + lastname

fname="bill"
lname="gates"

print(add(fname,lname))