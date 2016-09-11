# Consilium

Consilium is a single page application that implements a movie recommender
system by running machine learning algorithm(s) to make predictions on movie ratings.

[Consilium Live][live]
[live]:https://consilium.herokuapp.com/

## Instruction for Collaborators
Besides the standard,
```
$ bundle install
$ npm intall
```
Set up Redis in memory store by first installing Redis on your Mac or Linux OS
```
Mac OS X
$ brew install redis

Linux
$ sudo apt-get install redis-server
```

### Redis instance on Heroku
Redis URL can be found by running

`$ heroku config | grep REDIS`

Redis instance info can be found by running

`$ heroku redis:info`

## Regression
The first step of this project is to use gradient descent to fit linear/quadratic
functions to univariate/multivariate data set.
