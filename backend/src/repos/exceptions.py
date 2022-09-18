class RepoError(Exception):
    pass


class NotFoundError(RepoError):
    pass


class MalformedDataSourceError(RepoError):
    pass
