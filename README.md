# Shrink

Shrinking URLs á la skill share

## Running shrink API locally

You may want to add a line to your /etc/hosts file to have nice routing to, say, (our choice) shri.nk domain.

Additionally, for even nicer urls you may also want to add `.env` file and set `PORT=80` (check you have permissions to open that port on yout host).

Finally, you may want to run a local image of MongoDB to avoid installing anything:

`docker pull mongo:3-xenial && docker run -d --name mongo-container -p 27017:27017 mongo:3-xenial`

## Using CLI 

Our CLI works as a node command that is executed by npm. In turn, we advise you create an alias so that it can be used with ease:

`alias shrink='npm run cli'`

By doing so, you will be able to use it as follows:

`shrink this: http://www.skillshare.com`

`shrink stats: http://shri.nk/emI05`

`shrink toggle: http://www.bbc.co.uk`