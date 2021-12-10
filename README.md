<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>




## Description

[Searchery](https://github.com/tyku/tag-replacer) Search mentions. Fast.

## Installation

```bash
$ npm install
```

## Running the app. Just start docker and ...

```
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test
```
## Using

###Task 1:
Application starts on port 9001. [Here: http://127.0.0.1:9001](http://127.0.0.1:9001) <br/>
Swagger doc. Not full, but exist. [Swagger](http://127.0.0.1:9001/swagger) <br/>

App has one "hardcode" text about Brad Pitt with mentions and tags.<br/>
If you want to see all found mentions, use [/v1/search/mentions](http://127.0.0.1:9001/v1/search) <br/>
For detailed info, use [/v1/search/mentions/data](http://127.0.0.1:9001/v1/search) <br/>

###Task2:
sql-query.sql - query for task 2
first-set.png - screenshot of query result with data from task
second-set.png - screenshot with updated data
