#!/usr/bin/env python
# coding: utf-8


import pandas as pd
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser


def scrape():
    executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
    browser = Browser('chrome', **executable_path, headless=False)
    url = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    response = requests.get(url)
    soup = bs(response.text, "html.parser")
    soup

    title_result = soup.find("div", class_="content_title")
    news_title = title_result.a.text.strip()
    paragraph_result = soup.find("div", class_="rollover_description_inner")
    news_p = paragraph_result.text.strip()

    # # JPL Mars Space Images - Featured Image
    image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(image_url)
    html = browser.html
    soup = bs(html, 'html.parser')
    imgBase_url = 'https://www.jpl.nasa.gov'
    img_partial_url = soup.find("a", class_="fancybox")["data-fancybox-href"]
    img_url = f'{imgBase_url}{img_partial_url}'

    # # Mars Weather
    mars_weather_url = "https://twitter.com/marswxreport?lang=en"
    response = requests.get(mars_weather_url)
    soup = bs(response.text, "html.parser")
    soup
    tweets = soup.find_all("div",class_="content")
    for tweet in tweets:
        if tweet.b.text == "MarsWxReport":
            curr_weather = soup.find("p", class_="TweetTextSize").text.replace('\n',' ')
            break

    #Mars Facts
    table_url = "https://space-facts.com/mars/"
    table_list = pd.read_html(table_url)
    mars_fact_table = table_list[0]
    mars_fact_table.columns = ["Description","Value"]
    mars_fact_table
    mars_fact_html_table = mars_fact_table.to_html()
    mars_fact_html_table

    #Mars Hemispheres
    hemisphere_image_urls = []
    hemisphere_image_links = ("https://astrogeology.usgs.gov/search/map/Mars/Viking/cerberus_enhanced",
    "https://astrogeology.usgs.gov/search/map/Mars/Viking/schiaparelli_enhanced",
    "https://astrogeology.usgs.gov/search/map/Mars/Viking/syrtis_major_enhanced",
    "https://astrogeology.usgs.gov/search/map/Mars/Viking/valles_marineris_enhanced")

    for url in hemisphere_image_links:
        response = requests.get(url)
        soup = bs(response.text, "html.parser")
        title = soup.find("h2", class_="title").text
        pic_url = soup.find("a",target="_blank")["href"]
        
        temp_dict = {}
        temp_dict["Title"]=title
        temp_dict["img_url"]=pic_url
        hemisphere_image_urls.append(temp_dict)
        temp_dict={}
        
    #Put it all together

    mars_data = {
        "news_title": news_title,
        "news_p": news_p,
        "img_url": img_url,
        "curr_weather": curr_weather,
        "mars_fact_html_table":mars_fact_html_table,
        "hemisphere_image_urls": hemisphere_image_urls
    }
    return mars_data