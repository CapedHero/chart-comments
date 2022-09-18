class DomainObjectError(Exception):
    pass


class NotFoundError(DomainObjectError):
    pass


class ValidationError(DomainObjectError):
    pass
