# Shrink

Shrinking URLs á la skill share. 

This README file contains 3 main sections: 

1. Intro to Shrink 
2. Configuration
3. Using the CLI 

## Introduction to Shrink

Shrink is a ver basic tool that, essentially, shrinks URLs via CLI using a REST API and MongoDB. It has two main components:

- The API: This enables all services to shrink and redirect to source URLs.
- The CLI: This is the official interface to access all Shrink functionality.

### Available Operations

Shrink allows you to:

- Shrink any URL: You can use the CLI with the `this:` command to obtain the shrunk URL. See more details in the "Using the CLI" section below.
- Get stats from any shrunk URL (or the 'original' URL, works both ways): You can use the CLI with the `stats:` command.
- Toggle on/off any shrunk URL (or the 'original' URL): You can use the CLI with the `toggle:` command.

## Configuration

### Required Configuration

First, you want to add a `.env` file with the following entries:

```SHRINK_DOMAIN=sho.rt # value set to anything you want to use (our choice is `shri.nk`)
   PORT=80              # (check you have permissions to open that port on your host)
   DB_HOST=localhost```

### Optional Configuration

You may want to add a line to your `/etc/hosts` file to have nice routing to your defined domain (see above).

#### CLI Configuration

Our CLI works as a node command that is executed by npm. In turn, we advise you create an alias so that it can be used with ease:

`alias shrink='npm run cli'`

#### Docker Mongo Instance

Run a local image of MongoDB to avoid installing anything:

`docker pull mongo:3-xenial && docker run -d --name mongo-container -p 27017:27017 mongo:3-xenial`

## Using Shrink CLI

You can shrink an url by passing the command `this:`. NOTE: This call is idempotent, meaning that it will return on every equal request the same shrunk URL after it has been shrunk the first time.

`shrink this: http://www.skillshare.com`

You can also retrieve stats of the times this shrunk URL has been used by passing the `stats:` command.

`shrink stats: http://shri.nk/emI05`

Finally, your shrunk URL can be disabled temporarily, by passing the `toggle:` command. It will return 409 if the URL is used while disabled. This call is a switch to alternate between 'enabled' and 'disabled' status.

`shrink toggle: http://www.bbc.co.uk`
