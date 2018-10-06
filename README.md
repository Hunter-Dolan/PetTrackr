# README

### Running it

To run you need to first install Ruby then run

```bundle install # Install Ruby Gems```

To install the ruby gems required.

Next run

```yarn install # Install Node Packages```
or 
```npm install # Install Node Packages if you don't have yarn```

Then run

```rake db:migrate # Migrate the database```
```rake db:seed # Seed the database with samples```

Finally to start the server run

```bundle exec rails s RAILS_ENV=development # Start the rails server```

and to start crono run (to get live updates on pet positions) run

```bundle exec crono RAILS_ENV=development # Start the cron server```

There you go!

### Things that aren't done in this, that would be required in production

This project needs tests.