#testcomment
#!/usr/bin/env python
# Name: Jasper Naberman
# Student number: 10787224
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    
    # make a list consisting of 50 arrays with 5 elements
    x, y = 5, 50
    matrix = [[0] * x for i in range(y)]
    
    # initiate a counter
    counter = 0
    
    # iterate over the movies
    for movie in dom.by_tag('div.lister-item-content'):
        
        matrix[counter][0] = movie.by_tag('a')[0].content # title
        
        matrix[counter][1] = movie.by_tag('strong')[0].content # rating
        
        matrix[counter][2] = (movie.by_class('genre')[0].content).strip() # genres
        
        # make an empty string for actors
        actors = ''
        # iterate over all the actor tags
        for actor in movie.by_tag('p')[2].by_tag('a'):
            # if it's the first, just add the content of the tag
            if actor == movie.by_tag('p')[2].by_tag('a')[0]:
                actors = actor.content
            # otherwise, add a comma, and the content to the actors string
            else:
                actors = actors + ', ' + actor.content
        matrix[counter][3] = actors
        
        matrix[counter][4] = ''.join(x for x in movie.by_class('runtime')[0].content if x.isdigit()) # runtime
        
        # update the counter after each movie
        counter += 1

    return matrix  # replace this line as well as appropriate


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    for i in range(len(tvseries)):
        writer.writerow([tvseries[i][0].encode('ascii', 'ignore'), 
            tvseries[i][1].encode('ascii', 'ignore'), 
            tvseries[i][2].encode('ascii', 'ignore'), 
            tvseries[i][3].encode('ascii', 'ignore'), 
            tvseries[i][4].encode('ascii', 'ignore')])

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)