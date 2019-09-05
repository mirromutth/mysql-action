# MySQL GitHub Action

This [GitHub Action](https://github.com/features/actions) sets up a MySQL database.

## Usage

```yaml
steps:
- uses: mirromutth/mysql-action@v1
  with:
    mysql password: ${{ secrets.databasePassword }} # Required, the password of the superuser for the specified database
    mysql user: 'developer' # Optional, default value is "test", the superuser for the specified database. Of course you can use secrets, too
    mysql version: '8.0' # Optional, default value is "latest", the version of the MySQL in Docker
    mysql database: 'some_test' # Optional, default value is "test", the specified database which will be create
```

See [Docker Hub](https://hub.docker.com/_/mysql) for available versions.

See [Creating and using secrets (encrypted variables)](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) for hiding database password.

## License

This project is released under the [MIT License](LICENSE).
