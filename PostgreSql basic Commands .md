# Basic commands for psql CLI: 

## For connect psql server : 
	C:\Users\HP>psql -U postgres
	Password for user postgres:12345
	connected

## For Show databases in psql : 
	postgres=# \l

						List of databases
   	Name      |  Owner   | Encoding | Locale Provider
	postgres
	..
	..
	.. 

## For show current database : 
	postgres=# select current_database();

 	current_database
	------------------
 	postgres
	(1 row)
#### or 
	postgres=# \conninfo

            	Connection Information
      Parameter           |   Value
	----------------------+-----------
	 Database             | postgres
	 Client User          | postgres
	 Host                 | localhost
	..
	..

## Create database :
	postgres=# CREATE DATABASE first_db;
	CREATE DATABASE

## Connect database in psql:
	postgres=# \c first_db;
	You are now connected to database "first_db" as user "postgres".
	first_db=#

## Delete database in psql:
	postgres=# DROP DATABASE first_db;
	DROP DATABASE

## Create Table in database : (SAme in pgAdmin)
	first_db=# CREATE TABLE Students(id SERIAL PRIMARY KEY, name VARCHAR(20), email VARCHAR(50), password VARCHAR(20), is_verified BOOLEAN);
	CREATE TABLE


## Show all tables : 
	first_db=# \dt;
               List of tables
	 Schema |   Name   | Type  |  Owner
	--------+----------+-------+----------
	 public | students | table | postgres
	(1 row)

## Describe table : 
	first_db=# \d students
                                      Table "public.students"
	   Column    |         Type          | Collation | Nullable |               Default
	-------------+-----------------------+-----------+----------	+--------------------------------------
	 id          | integer               |           | not null | nextval	('students_id_seq'::regclass)
	 name        | character varying(20) |           |          |
	 email       | character varying(50) |           |          |
	 password    | character varying(20) |           |          |
	 is_verified | boolean               |           |          |
	Indexes:
	    "students_pkey" PRIMARY KEY, btree (id)



# Remove-Item -Recurse -Force .next  
<!-- Remove-Item -Recurse -Force .next  -->
<!-- Remove-Item -Recurse -Force .next  -->


# s

	\l                  → List databases
	\c database_name    → Connect to database
	\dt                 → List tables
	\d table_name       → Show table structure
	\du                 → List users
	\dn                 → List schemas
	\di                 → List indexes
	\dv                 → List views
	\conninfo            → Connection information
	\! cls              → Clear screen (Windows)
	\?                  → psql help
	\h                  → SQL help
	\q                  → Exit psql

