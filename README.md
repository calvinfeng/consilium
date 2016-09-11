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

### Setting up Redis on Rails (localhost)
In `config/initializers/redis.rb`, you will see how Redis is instantiated. The Redis instance
will be stored in a global variable `$redis` and you may call this variable anywhere in the Rails
app. For local host development, make sure to use
```
$redis = Redis.new(:host => 'localhost', :port => 6379)
```
and comment out the other line because that one is for deployment to Heroku

### Redis instance on Heroku
Redis URL can be found by running

`$ heroku config | grep REDIS`

Redis instance info can be found by running

`$ heroku redis:info`


## Regression
The first step of this project is to use gradient descent to fit linear/quadratic
functions to univariate/multivariate data set.
