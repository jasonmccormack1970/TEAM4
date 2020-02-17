
> Before starting made sure you have 
> installed the prerequisite software

# Prerequisites

To use this branch, you must have the following software installed. Use the latest stable versions.

-   Node.js - https://nodejs.org/en/download/
-   Git bash - https://git-scm.com/download/
-   PostgresDB - https://www.postgresql.org/download/

# Creating Your Development Environment

Open a git bash terminal, Using 'cd' change directory to where you want to create your installation folder.
For example your root c drive. 
```
cd c:\
```
Next download your hackathon team repo

For Team 1
``` 
https://github.com/jasonmccormack1970/TEAM1.git 
```

For Team 2 
```
https://github.com/jasonmccormack1970/TEAM2.git
```

For Team 3 
```
https://github.com/jasonmccormack1970/TEAM3.git
```

For Team 4
```
https://github.com/jasonmccormack1970/TEAM4.git
```

A new folder called TEAN(n) will have been created. We now need to download and install all the required program dependencies and generates the necessary node_modules folder(s). 
Change directory into your TEAMn folder then run the npm package manager installer : for example
```
cd TEAM1/
npm install
```
Now change directory into the react client folder and run the npm package manager installer
```
cd client
npm install
```
You can close your Git Bash terminal once the npm installer has completed.
Now open your TEAM(n) folder in Visual Code.
Check that you have a node_modules folder in the root of your project and a second node_modules folder under the client folder.

Now open a Git Bash terminal from within Visual Code and start your development environment.
```
npm run dev
```
You should see the following messages displayed in the terminal window. Note: there will be other information logged, take a moment to check that no errors were encoutered. 

```
Loading mock_api_data.json

Resources
http://localhost:3700/departments
http://localhost:3700/customers
http://localhost:3700/customer_dept

Home
http://localhost:3700

Express GraphQL Server Started ... Listening on Port 3600 - http://localhost:3600/graphql
```

A browser session should also automatically start and connect you to http://localhost:3500/ 
This is the home page of your Hackathon website (your development environmen). 

You should see the following Hello World message on your home page. 

>Hello World - This message has come from your GraphQL server, so you are good to start (Enjoy...!!!)

# Creating Your Postgres Database & Test Data

Using your Hackathon website navigate to Query Demo / Example Page 2 
(http://localhost:3500/example2)

Because we have not yet created our postgres databases the following 4 error messages will be displayed.
- GraphQL error: database "todo" does not exist
- GraphQL error: database "todo" does not exist
- GraphQL error: database "todo" does not exist
- GraphQL error: database "todo" does not exist

## Create the "todo" database

Connect to your postgreSQL server:-
Windows start menu / PostgreSQL 12 / pgAdmin 4
(http://127.0.0.1:58950/browser/)

Login using the password you set when you installed postgres
Right Click on Databases(1) - select Create / Database ...
Enter todo as the database name and postgres as the owner then click [Save] 

The todo database will now appear in the treeview. click on the todo database 
to highlight it then select Query Tool from the Tools menu

Paste the following script into the Query Editor window

```
drop table if exists users;
drop table if exists tasks;

CREATE SEQUENCE public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;

CREATE SEQUENCE public.tasks_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.tasks_id_seq
    OWNER TO postgres;
	
CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(128) COLLATE pg_catalog."default",
    first_name character varying(128) COLLATE pg_catalog."default",
    last_name character varying(128) COLLATE pg_catalog."default",
    department character varying(128) COLLATE pg_catalog."default",
    apikey character varying(128) COLLATE pg_catalog."default",
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active boolean DEFAULT true,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

CREATE TABLE public.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    notes text COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'draft'::character varying,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assignedto integer NOT NULL,
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT tasks_created_by_fkey FOREIGN KEY (assignedto)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.tasks
    OWNER to postgres;    

INSERT INTO public.users(
	email, first_name, last_name, department, apikey )
	VALUES 
        (E'fiona.hodges@manf.hackathon.test',E'Fiona',E'Hodges',E'Navigation',E'010'),
        (E'adrian.hill@manf.hackathon.test',E'Adrian',E'Hill',E'Environmental and Consumables',E'020'),
        (E'jake.edmunds@manf.hackathon.test',E'Jake',E'Edmunds',E'Payload Deployment',E'030'),
        (E'wendy.ferguson@manf.hackathon.test',E'Wendy',E'Ferguson',E'Ground Control',E'040'),
        (E'commolly.morrison@manf.hackathon.test',E'Molly',E'Morrison',E'Payload Operations',E'050'),
        (E'emily.randall@manf.hackathon.test',E'Emily',E'Randall',E'Flight research',E'060'),
        (E'gavin.walker@manf.hackathon.test',E'Gavin',E'Walker',E'Illumination Engineering',E'070'),
        (E'faith.anderson@manf.hackathon.test',E'Faith',E'Anderson',E'Propulsion technology',E'080'),
        (E'ian.rutherford@manf.hackathon.test',E'Ian',E'Rutherford',E'Flight research',E'090'),
        (E'stephanie.dickens@manf.hackahon.test',E'Stephanie',E'Dickens',E'Instrumentation and Communications',E'100');

INSERT INTO public.tasks(
 title, notes, status, assignedto)
	VALUES  
     (E'Pack air freshener',E'The nice smelling one',E'Pending',E'2'),
     (E'Fill fuel tanks',E'Remeber to use unleaded fuel',E'Pending',E'8'),
     (E'Put space maps and good food guide in glove compartment',E'',E'Pending',E'1');
```

Use the [Play] button or press F5 to excute the query
The SQL script can also be found in your Visual Code project ../database/CreateTbl.sql

If you now return to Query Demo / Example Page 2 
http://localhost:3500/example2
Note: you may need to refresh the page 
You should now see User and Task data. 
If instead you see the following error message

- GraphQL error: password authentication failed for user "postgres"

check the following file "../config/pg.js" in your Visual Code project. make sure the values set match
your installation of postgres

```
module.exports = {
    development: {
        database: 'todo',
        user: 'postgres',
        password: 'myexamplepassword',
    },
};
```


# NPM Scripts

to start your EXPRESS, GRAPHQL, JSON-SERVER and REACT Client

```
npm run dev
```

To only start your Express and GraphQL Servers

```
npm run server
```

To only start your JSON Server

```
npm run json:server
```

To only start the react

```
npm run client
```
## NOTE - BEFORE YOUR START CREATE A LOCAL BRANCH - NEVER MODIFY YOUR MASTER BRANCH

# Override Default Port Numbers

From the root of the project

-   Use the client/.env file to set/change the react_app port number
-   Use the config/express_config.json file to set/change he Express/GraphQL server port number
-   Use the json-server.json file to set/change the JSON server port number

# How to enable CORS for Express-GraphQL & Apollo Server

If you follow many of the example on how to configure an Express-GraphQL & Apollo Server you may encounter a problem with Cross-origin resource sharing, (CORS)

Example:

```
Access to fetch at 'http://localhost:3100/graphql' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

The CORS middleware has already been implemented on this repo so this common error should not be encountered

```
./lib/index.js
.
.
const cors = require('cors');
.
.
app.use(cors());
```

For more information on what causes this error and how to fix it visit:
https://www.prisma.io/blog/enabling-cors-for-express-graphql-apollo-server-1ef999bfb38d
