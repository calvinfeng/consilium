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
and comment out the other line, because that one is for deployment to Heroku

### Redis instance on Heroku
Redis URL can be found by running

`$ heroku config | grep REDIS`

Redis instance info can be found by running

`$ heroku redis:info`

### Start running
First you need to start your Redis server by typing in
```
$ redis-server
```
Now you can start your Rails server
```
$ rails s
```
Don't forget webpack!

## Database Design
### New Design
Currently Consilium doesn't really have a database, it stores a giant hash map in Redis cache
which contains all the necessary information for SVD matrix factorization algorithm. The values
are computed off-line with some Python scripts. Now the next natural move is to actually
keep things in a database. So here's the new schema for the upcoming back-end design

#### `HistoricalUser`

We will introduce a ActiveRecord model that is responsible for holding historical data from
the giant data set from MovieLens. `HistoricalUser` has many movies through association

| column name | key | data type | note             |
|------------ |-----|-----------|------------------|
| id          | PK  | Integer   | Provided         |
| preference  |     | Arrays    | Offline computed |

`HistoricalUser` has many `Rating`s in our ActiveRecord associations

#### `Rating`

This is basically a join table with two foreign keys, pointing to `HistoricalUser` / `User`
and `Movie`

| column name | key | data type | note             |
|-------------|-----|-----------|------------------|
| id          | PK  | Integer   | Auto-incremented |
| user_id     | FK  | Integer   |                  |
| movie_id    | FK  | Integer   |                  |
| value       |     | Float     |                  |


#### `Movie`

`Movie` has many ratings and many viewers through the `Rating` association

| column name | key | data type | note               |
|-------------|-----|-----------|--------------------|
| id          | PK  | Integer   | Provided           |
| title       |     | String    |                    |
| year        |     | Integer   |                    |
| imdb_rating |     | Float     |                    |
| imdb_id     |     | String    |                    |
| feature     |     | Arrays    | Offline computed   |


#### `User`

This is a model for active user who login to our system through FB authentication.
We will use Facebook ID as the primary key for this table. The detailed design will
come later as we implement the actual FB authentication system on the front-end.
