"""
Find all the Arks in the TEI documents, ask the SNAC server if they're up-to-
date, and replace the ones that aren't.

Written by James Truitt, November 2021
"""

import json, requests, re
from glob import glob

class ApiError(Exception):
	def __init__(self, message):
		self.message = message

	def __str__(self):
		return str(self.message)

def getFilenames():
	"""
	Use glob to return a list of the .xml files in obf-site/src/assets/pid-tei.
	"""
	filenames = glob("../pid-tei/*.xml")
	return filenames

def loadTei():
	"""
	Load the TEI data stored in XML files in obf-site/src/assets/pid-tei.

	@return: a dict (str:str) w/ filenames as keys and file contents as values
	"""
	print("Loading TEI data from files...")

	# Get list of filenames
	filenames = getFilenames()

	# Init dict that will hold file names & contents
	teiData = {}

	# Loop over the files, opening each and extracting its contents into teiData
	for filename in filenames:
		with open(filename) as f:
			teiData[filename] = f.read()

	print("Data successfully loaded.\n")

	return teiData

def findArks(teiData):
	"""
	Get a list of Ark IDs used as values of the @key attrib in the TEI files.

	@param teiData: a dict w/ filenames as keys and file contents as values
	@return: a set of ark IDs as strings
	"""

	print("Extracting Ark IDs from TEI data...")

	# Init container that will hold the arks
	arks = set()

	# Loop over TEI files,
	for filename in teiData:
		tei = teiData[filename]

		# finding all unique Arks in each (i.e., the values of attribute @key),
		localArks = set(re.findall('(?<=key=")\w{8}(?=")', tei))

		# And adding them to the larger set of Arks
		arks = arks.union(localArks)

	print("Successfully extracted {} unique Ark IDs.\n".format(len(arks)))
	return arks

def postToApi(data, baseUrl):
	"""
	Make a POST call to a REST API and return the response

	@param: data, dict, JSON data to be passed in the call
	@param: baseUrl, str, the URL of the API to call
	@return the API response in dict form
	"""
	data = json.dumps(data) # Turn the dictionary into JSON
	r = requests.put(baseUrl, data = data) # MAKE THE API REQUEST!!!!!
	response = json.loads(r.text) # Turn the response from JSON into a dict
	return response

def verifyApiSuccess(response):
	"""
	Raise an apiError if the API response passed as a param is an error

	@param: response, dict, a JSON response from a REST API
	"""
	if "error" in response:
		try:
			type = response["error"]["type"]
			message = response["error"]["message"]
			raise ApiError(type + ": " + message)
		except TypeError:
			print(response)
			raise ApiError("Seems like one of the weird ones")

def readConstellation(ark):
	"""
	Download up-to-date version of a constellation via a call to the SNAC API.

	@param ark: the ark id of the constellation we want to download
	@return: a constellation json in dict form
	"""

	# Define basic variables needed for API call
	baseUrl = "https://api.snaccooperative.org"
	ark = "http://n2t.net/ark:/99166/" + ark
	req = {"command": "read", "arkid": ark, "type": "summary"}

	# Make API request
	response = postToApi(req, baseUrl)

	# Raise an error if the API encountered a problem
	verifyApiSuccess(response)

	return response["constellation"]

def getUpdatedArks(arks):
	"""
	Identify outdated Ark IDs and get their current versions.

	Operates via calls to the SNAC API
	@param arks: a set of Ark IDs to check
	@return: a dict (str:str) w/ outdated Arks as keys & current ones as values.
	"""
	print("Checking that Ark IDs are up-to-date with SNAC...")

	# Initialize dict to eventually return
	arksToUpdate = {}

	# Initialize variables to keep track of successes & failures in API calls
	successCount = 0
	errors = []

	counter = 0 # To display progress
	for ark in arks:
		counter += 1
		print("Checking Ark #{} ({})".format(counter, ark), end="\r")

		try:
			# Make API call to get up-to-date constellation
			constellation = readConstellation(ark)
		except ApiError as e:
			msg = "\nCould not read " + ark + " due to the following error\n"
			raise

		# Extract Ark ID from up-to-date constellation
		currentArk = constellation["ark"][-8:]

		# Compare up-to-date Ark ID to one found in TEI files
		if ark != currentArk:
			arksToUpdate[ark] = currentArk

	print("Successfully")
	return arksToUpdate

def updateArkInTei(ark, teiData):
	"""
	Replace an outdated Ark ID w/ its current form across the TEI documents.

	@param ark: an outdate Ark ID that is a key of the updatedArks dict
	@param teiData: a dict w/ filenames as keys and file contents as values
	@return: None
	@side effects: Alter the contents of the values in teiData.
	"""
	pass

def writeTeiToFile(filename, teiContents):
	"""
	Write the contents of a TEI file (in str form) to a file.
	"""

def main():
	print()

	teiData = loadTei()

	arks = findArks(teiData)

	updatedArks = getUpdatedArks(arks)

	for ark in updatedArks:
		updateArkInTei(ark, teiData)

	for tei in teiData:
		writeTeiToFile(tei, teiData[tei])

if __name__ == "__main__":
	main()
