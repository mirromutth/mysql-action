# MySQL GitHub Action

This [GitHub Action](https://github.com/features/actions) sets up a MySQL database.

## Usage

```yaml
steps:
- uses: mirromutth/mysql-action@v1.1
  with:
    host port: 3800 # Optional, default value is 3306. The port of host
    container port: 3307 # Optional, default value is 3306. The port of container
    character set server: 'utf8' # Optional, default value is 'utf8mb4'. The '--character-set-server' option for mysqld
    collation server: 'utf8_general_ci' # Optional, default value is 'utf8mb4_general_ci'. The '--collation-server' option for mysqld
    mysql version: '8.0' # Optional, default value is "latest". The version of the MySQL
    mysql database: 'some_test' # Optional, default value is "test". The specified database which will be create
    mysql root password: ${{ secrets.RootPassword }} # Required if "mysql user" is empty, default is empty. The root superuser password
    mysql user: 'developer' # Required if "mysql root password" is empty, default is empty. The superuser for the specified database. Of course you can use secrets, too
    mysql password: ${{ secrets.DatabasePassword }} # Required if "mysql user" exists. The password for the "mysql user"
```

See [Docker Hub](https://hub.docker.com/_/mysql) for available versions.

See [Creating and using secrets (encrypted variables)](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) for hiding database password.

## License

This project is released under the [MIT License](LICENSE).
