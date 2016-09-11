# Consilium

Consilium is a single page application that implements a movie recommender
system by running machine learning algorithm(s) to make predictions on movie ratings.

[Consilium Live][live]
[live]:https://consilium.herokuapp.com/

## Instruction for Collaborators
Beside the standard
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

## Regression
The first step of this project is to use gradient descent to fit linear/quadratic
functions to univariate/multivariate data set.
