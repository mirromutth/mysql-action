# MySQL GitHub Action [![Test status](https://github.com/mirromutth/mysql-action/workflows/test/badge.svg)](https://github.com/mirromutth/mysql-action/actions)

This [GitHub Action](https://github.com/features/actions) sets up a MySQL database in Docker.

It supports various MySQL options to accurately configure and execute MySQL. So it may not be your best choice when you just want to run a simple MySQL, see [The Default MySQL](#the-default-mysql).

It is based on the Docker container and is limited by Github Actions, which contains only Linux now. Therefore it does not work in Mac OS and Windows environment.

## Usage

```yaml
steps:
- uses: mirromutth/mysql-action@v1.1
  with:
    host port: 3800 # Optional, default value is 3306. The port of host
    container port: 3307 # Optional, default value is 3306. The port of container
    container name: 'some_test_mysql' # Optional, default value is 'some_mysql'. The name of container
    character set server: 'utf8' # Optional, default value is 'utf8mb4'. The '--character-set-server' option for mysqld
    collation server: 'utf8_general_ci' # Optional, default value is 'utf8mb4_general_ci'. The '--collation-server' option for mysqld
    mysql version: '8.0' # Optional, default value is "latest". The version of the MySQL
    mysql database: 'some_test' # Optional, default value is "test". The specified database which will be create
    mysql root password: ${{ secrets.RootPassword }} # Required if "mysql user" is empty, default is empty. The root superuser password
    mysql user: 'developer' # Required if "mysql root password" is empty, default is empty. The superuser for the specified database. Can use secrets, too
    mysql password: ${{ secrets.DatabasePassword }} # Required if "mysql user" exists. The password for the "mysql user"
```

If want bind MySQL host port to 3306, please see [The Default MySQL](#the-default-mysql).

See [Docker Hub](https://hub.docker.com/_/mysql) for available MySQL versions.

See [Creating and using secrets (encrypted variables)](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) for hiding database password.

## The Default MySQL

MySQL *may* be installed and started by Github Actions (aka. the Default MySQL), that version is 5.7 generally, root superuser password is "root" and port is 3306. See [Software in virtual environments for GitHub Actions](https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions).

So before set-up a MySQL which host port is 3306 in Docker, please make sure the Default MySQL has been shutted-down. Otherwise, action will fail and print an error log that looks like: `Error starting userland proxy: listen tcp 0.0.0.0:3306: bind: address already in use.` (See [#2](https://github.com/mirromutth/mysql-action/issues/2))

Sure, if you do not care about MySQL options, such as version, bound port, character set, character collation, root password, etc., you can use the Default MySQL instead of this Action.

### Shutdown the Default MySQL

```yaml
jobs:
  build:
    runs-on: ubuntu-${{ ubuntu-version }} # is Ubuntu environment

    # ... some other config ...

    steps:
    - # ... some prepare steps, like action/checkout, run some script without MySQL, etc.

    - name: Shutdown Ubuntu MySQL (SUDO)
      run: sudo service mysql stop # Shutdown the Default MySQL, "sudo" is necessary, please not remove it

    - # ... some steps before set-up MySQL ...
    - name: Set up MySQL
      uses: mirromutth/mysql-action@v1.1
      with:
        # ... Set-up MySQL configuration, see Usage

    - # ... some steps after set-up MySQL ...

    # ... some another config ...
```

## License

This project is released under the [MIT License](LICENSE).
