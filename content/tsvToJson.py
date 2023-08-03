import json, csv

#This file expects to be run from the same folder as constellationsForInclusion.tsv
filename = "constellationsForInclusion.tsv"

# Initialize the list that we will output
data = []

# Read data in from TSV file into a list of dictionaries
with open(filename) as csvfile:
        reader = csv.DictReader(csvfile, delimiter="\t")
        for row in reader:
            data.append(row)

# Write that list of dictionaries to a json file
with open("constellationsForInclusion.json", 'w') as f:
    json.dump(data, f)