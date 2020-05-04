# Shrink

Shrinking URLs á la skill share

## Running shrink API locally

First, you want to add a `.env` file with the `SHRINK_DOMAIN` value set to anything you want to use (our choice is `shri.nk` but I can't find any reason not to use `shr.nk` as well.

### Local DNS?

You may want to add a line to your `/etc/hosts` file to have nice routing to your defined domain (see above).

Additionally, for even nicer urls you may also want to set `PORT=80` to your `.env` file (check you have permissions to open that port on your host).

Finally, you may want to run a local image of MongoDB to avoid installing anything:

`docker pull mongo:3-xenial && docker run -d --name mongo-container -p 27017:27017 mongo:3-xenial`

## Using CLI 

Our CLI works as a node command that is executed by npm. In turn, we advise you create an alias so that it can be used with ease:

`alias shrink='npm run cli'`

By doing so, you will be able to use it as shown in the examples below.

You can shrink an url by passing the command `this:`. NOTE: This call is idempotent, meaning that it will return on every equal request the same shrunk URL after it has been shrunk the first time.

`shrink this: http://www.skillshare.com`

You can also retrieve stats of the times this shrunk URL has been used by passing the `stats:` command.

`shrink stats: http://shri.nk/emI05`

Finally, your shrunk URL can be disabled temporarily, by passing the `toggle:` command. It will return 409 if the URL is used while disabled. This call is a switch to alternate between 'enabled' and 'disabled' status.

`shrink toggle: http://www.bbc.co.uk`
