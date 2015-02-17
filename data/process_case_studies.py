import csv
import yaml


CASES = []
with open('case-studies.csv', 'rb') as csvfile:
	spamreader = csv.reader(csvfile)
	for row in spamreader:
		(region,location,sector,provider,status,example_name,mechanism,
			third_party_user,user_details,data_category,data_source,data_source_type,has_PII,
			data_fomrat,time_frame_size,number_of_consumers,has_PII_shared,anonymization_details,
			use_category,use_subcategories,used_data_type,use_details,legal_dimensions,description,reference) = row
		CASES.append({ 'sharedBy': provider,
			'forUse': data_category,
			'status': status,
			'description': description,
			'link': reference,
			'typeOfActivity': mechanism,
			'name': example_name})

print yaml.dump(CASES, default_flow_style=False).replace('!!python/str ', '')