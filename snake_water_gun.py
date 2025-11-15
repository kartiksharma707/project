import random

'''
1 for snake 
-1 for water
0 for gun
'''
computer= random.choice([-1, 0, 1])
yourstr=input("Enter your choice (s for Snake, w for Water, g for Gun): ") .lower()
yourdict={"s":1, "w":-1, "g":0}
you=yourdict[yourstr]
reversedict={1:"snake",-1:"water",0:"gun"}
print(f"you choose {reversedict[you]}\nComputer choose {reversedict[computer]}")

if computer == you:
    print("Its a Draw")
else:
    if (computer==1 and you==-1):
        print("You Lose!")
    elif (computer==-1 and you==1):
        print("You Won!")
    elif (computer==0 and you==1):
        print("You Lose!")
    elif (computer==1 and you==0):
        print("You Win!")
    elif (computer==-1 and you==0):
        print("You Lose!")
    elif (computer==0 and you==-1):
        print("You Won!")
    else:
        print("Something went wrong")
