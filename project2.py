import random

n = random.randint(1, 100)
guesses = 0

while True:
    guesses += 1
    try:
        a = int(input("Guess the number: "))
    except ValueError:
        print("Please enter a valid integer.")
        continue

    if a > n:
        print("Lower number please")
    elif a < n:
        print("Higher number please")
    else:
        break

print(f"You have guessed the number {n} correctly in {guesses} attempts")
