def next_permutation(arr):
    n = len(arr)
    i = n - 2
    # Step 1: Find the largest index i such that arr[i] < arr[i + 1]
    while i >= 0 and arr[i] >= arr[i + 1]:
        i -= 1
    if i >= 0:
        # Step 2: Find the largest index j greater than i such that arr[i] < arr[j]
        j = n - 1
        while arr[j] <= arr[i]:
            j -= 1
        # Step 3: Swap the values of arr[i] and arr[j]
        arr[i], arr[j] = arr[j], arr[i]
    # Step 4: Reverse the sequence from arr[i + 1] to the end
    arr[i + 1:] = reversed(arr[i + 1:])
    return arr




array = [3, 2, 1]


print(next_permutation(array))