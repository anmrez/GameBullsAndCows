## Install

### Run client by docker
Go to folder 'client'

**Steep 1**

    docker build .

**Steep 2**

    Docker run -d -p 5000:5000 **YourCOntainerID**

> server started on 5000 port

### Run client by NPM
Go to folder 'client'

    npm i
    npm run build
    npm run serve

> server started on 5000 port