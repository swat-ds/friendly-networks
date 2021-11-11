"""
Find all the Arks in the TEI documents, ask the SNAC server if they're up-to-
date, and replace the ones that aren't.

Written by James Truitt, November 2021
"""

import json, requests
from glob import glob

def getFilenames():
    """
    Use glob to return a list of the .xml files in obf-site/src/assets/pid-tei.
    """
    filenames = glob("../pid-tei/*.xml")
    print(filenames)
    filenames

def loadTei():
    """
    Load the TEI data stored in XML files in obf-site/src/assets/pid-tei.

    @return: a dict (str:str) w/ filenames as keys and file contents as values
    """
    return {"":""}

def findArks(teiData):
    """
    Get a list of Ark IDs used as values of the @key attrib in the TEI files.

    @param teiData: a dict w/ filenames as keys and file contents as values
    @return: a list of ark IDs as strings
    """
    return [""]

def readConstellation(ark):
    """
    Download up-to-date version of a constellation via a call to the SNAC API.

    @param ark: the ark id of the constellation we want to download
    @return: a constellation json in dict form
    """
    return {"":""}

def getUpdatedArks(arks):
    """
    Identify outdated Ark IDs and get their current versions.

    Operates via calls to the SNAC API
    @param arks: a list of Ark IDs to check
    @return: a dict (str:str) w/ outdated Arks as keys & current ones as values.
    """
    return {"":""}

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

    print()

if __name__ == "__main__":
    main()
