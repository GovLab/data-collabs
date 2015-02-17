import glob
import os
import yaml
from slugify import slugify

from jinja2 import Environment, FileSystemLoader


TEMPLATES_DIR = 'templates'
CASE_STUDIES = yaml.load(open('data/case-studies.yaml'))
for case in CASE_STUDIES:
	case['slug'] = slugify(case['name'], to_lower=True)

template_data = {
	'title': 'Data X Collaboration',
	'CASE_STUDIES': CASE_STUDIES, 
	'total_case_studies': len(CASE_STUDIES)
}

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

if __name__ == '__main__':
  Main()