import yaml
from slugify import slugify
import csv

from jinja2 import Environment, FileSystemLoader

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

TEMPLATES_DIR = 'templates'

#CASE_STUDIES = yaml.load(open('data/case-studies.yaml'))[1:]

CASE_STUDIES = []

with open('data/new-projects2.csv', 'rb') as csvfile:
	reader = csv.reader(csvfile)
	for row in reader:
		(purpose, kindofSharing, dataUse, featured, ranking, projectTitle,
			actor1, actor2, actor3, actor4, actor5, actor6, actor7, actor8, actor9, actor10, actor11,
			region, sharedby, sharedwith, status, imageFileName, featuredImage,
			summary, background, legalGovernance, dataUseImpact, reference, pressRelease) = row
		CASE_STUDIES.append( {
		'purpose': purpose,
		'kindofSharing': kindofSharing,
		'dataUse': dataUse,
		'featured': featured,
		'ranking': float(ranking),
		'name': projectTitle,
		'actor1': actor1,
		'actor2': actor2,
		'actor3': actor3,
		'actor4': actor4,
		'actor5': actor5,
		'actor6': actor6,
		'actor7': actor7,
		'actor8': actor8,
		'actor9': actor9,
		'actor10': actor10,
		'actor11': actor11,
		'region': region,
		'sharedby': sharedby,
		'sharedwith': sharedwith,
		'status': status,
		'img': imageFileName,
		'featuredImage': featuredImage,
		'summary': summary,
		'background': background,
		'legalGovernance': legalGovernance,
		'dataUseImpact': dataUseImpact,
		'link': reference,
		'pressRelease': pressRelease } )

mySlug = lambda x: slugify(x, separator='_', to_lower=True)

kindOfSharingFilters = {}
dataUseFilters = {}

for case in CASE_STUDIES:
	case['slug'] = mySlug(case['name'])
	case['tags'] = map( lambda x:mySlug(case[x]), ['kindofSharing', 'dataUse'])
	kindOfSharingFilters[case['kindofSharing']] = mySlug(case['kindofSharing'])
	dataUseFilters[case['dataUse']] = mySlug(case['dataUse'])
	case['actors'] = [case['actor%d' % i ] for i in range(1,11) if case['actor%d' % i ] != ""]
	case['purpose'] = mySlug(case['purpose']).replace('_', '-').strip()
	print case['purpose']
	#statusFilters[case['status']] = mySlug(case['status'])

template_data = {
	'title': 'The Data Collaboratives Directory',
	'CASE_STUDIES': sorted(CASE_STUDIES, key=lambda x:x['name']), 
	'total_case_studies': len(CASE_STUDIES),
	'kindOfSharingFilters': kindOfSharingFilters,
	'dataUseFilters': dataUseFilters
}


def removeDuplicates(myList):
	projects = {}
	for k in myList:
		projects[k['name']] = k
	return projects.values()


def Main():
	env = Environment(loader=FileSystemLoader(TEMPLATES_DIR),
		extensions=['jinja2.ext.with_'])

	for case in CASE_STUDIES:
		template = env.get_template('project_detail.html')
		html = template.render(case)
		with open('site/ajax/%s.html' % case['slug'], 'w') as f:
			f.write(html.encode('utf8'))
			f.close()

	pages = [ 'index' ]
	for page in pages:
		template = env.get_template('%s.html' % page)
		html = template.render(template_data)
		with open('site/%s.html' % page, 'w') as f:
			f.write(html.encode('utf8'))
			f.close()

	pages = [ 'health', 'economic-development', 'education', 'environment', 'infrastructure' ]
	for page in pages:
		template = env.get_template('by_purpose.html')
		template_data['title'] = page.title()
		template_data['CASE_STUDIES'] = sorted(removeDuplicates([ k for k in CASE_STUDIES if k['purpose'] == page]), key=lambda x:x['ranking'], reverse=True)
		html = template.render(template_data)
		with open('site/%s.html' % page, 'w') as f:
			#f.write(html.encode('utf8'))
			f.write(html.decode('utf8'))
			f.close()

if __name__ == '__main__':
  Main()
  print [ k['purpose'] for k in CASE_STUDIES if k['purpose'] == 'economic-development']