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

## After review
0) KMP - просто тестил альтернативные алгоритмы. В задаче использовал алгоритм Ахо-Корасика
1) Добавил пробел в шаблон USER_PATTERN (src/app.module.ts:32)  
3) Fixed
4) Выбирал из 2х вариантов KMP, Ахо-корасика. 
   Критерии: 
   - скорость
   - масштабируемость
   
   Не хватило времени, что бы реализовать каждый аогоритм и построить для него перфоманс тесты.   
   Выбирал, опираясь на чужие данные по производительности алгоритмов и теоретические материалы.
   
   https://github.com/greenlaw110/java-str-benchmark/tree/string-match-algorithms

   Regexp не рассматривал подробно. В нем многое зависит от составленного паттерна.
   
   
5) Что бы добавить новый паттерн, нужно просто передать его в массив паттернов, по котором производится поиск
   src/app.module.ts:32
   

