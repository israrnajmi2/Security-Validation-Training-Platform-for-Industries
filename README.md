# Source code structure
```
.
├── 07_July_2025_itu_dcgi.sql
├── pom.xml
├── README.md
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── ss
    │   └── resources
    │       ├── application-ck.properties
    │       ├── application-ckv2.properties
    │       ├── application-cloudformations.properties
    │       ├── application-cybershield2.properties
    │       ├── application-cybershield.properties
    │       ├── application-demo.properties
    │       ├── application-dev.properties
    │       ├── application-docker.properties
    │       ├── application-emptydb.properties
    │       ├── application-genome.properties
    │       ├── application-gentwoqa.properties
    │       ├── application.properties
    │       ├── logback.xml
    │       ├── static
    │       │   ├── createAdminUser.html
    │       │   ├── css
    │       │   ├── fonts
    │       │   ├── images
    │       │   ├── index.html
    │       │   └── js
    │       └── templates
    │           └── login.html
    └── test
        └── java
            └── com
                └── ss
```

# Dockerised Setup
1. Clone the repository.
2. Just run `$ docker compose up`.
## Admin login
Login credentials after first setup (in case of sqldump/16_oct_2024_itu_dcgi.sql sqldump):

        User email: admin@admin.com
        Password: Admin123!
        Note: In case of sqldump/23_nov_2024_itu_dcgi_no_user.sql first user can be created from the login screen.

# Legacy Setup
## Install Java & Maven.

File content of .bash_profile. This shows the tested version for Java and Maven.
```bash
export PATH=/Users/chandrakanthn/softwares/apache-maven-3.6.3/bin:$PATH
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.2.jdk/Contents/Home
```
### Installing Java
* In case needed- Official link to java installation  - https://docs.oracle.com/javase/10/install/installation-jdk-and-jre-macos.htm#JSJIG-GUID-577CEA7C-E51C-416D-B9C6-B1469F45AC78

### Installing Maven
1. Downloaded maven from https://maven.apache.org/download.cgi . below are maven installation steps as mentioned in readme file of download
2. Unpack the archive where you would like to store the binaries, e.g.
    ```bash
    Unix-based operating systems (Linux, Solaris and Mac OS X)
        tar zxvf apache-maven-3.x.y.tar.gz
    Windows
        unzip apache-maven-3.x.y.zip
    ```
3. A directory called "apache-maven-3.x.y" will be created.
4. Add the bin directory to your PATH, e.g.:
    ```bash
    Unix-based operating systems (Linux, Solaris and Mac OS X)
        export PATH=/usr/local/apache-maven-3.x.y/bin:$PATH
    Windows
        set PATH="c:\program files\apache-maven-3.x.y\bin";%PATH%
    ```
5. Make sure `JAVA_HOME` is set to the location of your JDK
6. Run `mvn --version` to verify that it is correctly installed.
7. Close terminal. Open a new terminal & execute `mvn clean install` in the home folder of project. This should succeed if above steps are done correctly.



## Database Setup

1. Install mysql server 5.7. (Even in the deployed EC2 instance we use locally installed mysql 5.7 server instead of using managed aws database.)
2. In mysql create database named 'genome' and import attached sql dump to the newly created database.
    ```bash
    $ mysql -uroot -proot genome <16_oct_2024_itu_dcgi.sql
    ```
3. In case your mysql username/password are different then edit the file `src/main/resources/application-ck.properties` with your environment-specific values.

## Start the Application
1. to start java application I ran below command.
    ```bash
    $ java -Dspring.profiles.active=ck -jar target/custom_shield_gen_two-0.0.1-SNAPSHOT.jar
    ```
2. On successful start of application you will see the log "INFO  c.s.Application - Started Application in 11.642 seconds (JVM running for 12.579)" in a minute span.
3. In case of java 8 or more you may get error - *NoClassDefFoundError: javax/xml/bind/JAXBException*. In that case add below dependencies to pom.xml
    ```bash
    <dependency>

        <groupId>jakarta.xml.bind</groupId>

        <artifactId>jakarta.xml.bind-api</artifactId>

        <version>2.3.2</version>

    </dependency>



    <!-- Runtime, com.sun.xml.bind module -->

    <dependency>

        <groupId>org.glassfish.jaxb</groupId>

        <artifactId>jaxb-runtime</artifactId>

        <version>2.3.2</version>


    </dependency>
    ```

## SSL Setup
1. For ssl/https configuration, used nginx 
2. We are using wildcard ssl certificate created from website by name namecheap.com.
3. The file content of `/etc/nginx/sites-available/sinow` is given below.
    ```
    server {
        client_max_body_size 50M;
        server_name itu-dcgi.securityinclusionnow.org;
        #server_name 52.24.193.211;
        listen 80;
        return 301 https://$host$request_uri;
    }

    server {
        client_max_body_size 50M;
        listen 443;
        server_name itu-dcgi.securityinclusionnow.org;
        #server_name 52.24.193.211;
        add_header X-Frame-Options "DENY";
        add_header Strict-Transport-Security "max-age=63072000; includeSubdomains;";
        ssl_certificate /etc/nginx/ssl/sinow_new_chain.crt;
        ssl_certificate_key /etc/nginx/ssl/sinow_new.key;

        ssl on;
        ssl_session_cache builtin:1000 shared:SSL:10m;
        ssl_protocols TLSv1.1 TLSv1.2;
        ssl_ciphers 'ECDHE+AESGCM:ECDHE+AES256+SHA384:ECDHE+RSA+AES128+GCM+SHA256:AES256+EECDH:EDH+RSA+AES256+GCM+SHA384:DHE-RSA-AES128-GCM-SHA256:AES256+EECDH:EDH:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:AES256-SHA:AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384';
        ssl_prefer_server_ciphers on;

        underscores_in_headers on;

        location / {
            proxy_pass http://localhost:6529/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_read_timeout 200;
            proxy_redirect http://localhost:6529 https://itu-dcgi.securityinclusionnow.org;
        }

        error_log /ebs/cybershield-sinow-error.log warn;
        access_log /ebs/cybershield-sinow-access.log combined;
    }
    ```
