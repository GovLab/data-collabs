import csv
import yaml


CASES = []
with open('case-studies.csv', 'rb') as csvfile:
	spamreader = csv.reader(csvfile)
	for row in spamreader:
		(region, location, sector, sharedBy, status, title, typeOfActivity,
			thirdPartyUser, sharedWith, dataCategory, dataSource, dataSourceType,
			hasPiiInOriginalData, formatOfDataShared, timeframeSizeOfDataset, 
			numberOfConsumers, hasPiiInSharedFormat, anonymizationDetails, dataFor, 
			useSubCategories, usedDataType, useDetails, legalDimensions, imageFilename, 
			textForWriteup, reference) = row
		CASES.append({ 'sharedBy': sharedBy,
			'sharedWith': sharedWith,
			'sector': sector,
			'forUse': dataCategory,
			'img': imageFilename,
			'status': status,
			'description': textForWriteup,
			'link': reference,
			'typeOfActivity': typeOfActivity,
			'location': location,
			'userDetails': useDetails,
			'name': title})

print yaml.dump(CASES, default_flow_style=False).replace('!!python/str ', '')