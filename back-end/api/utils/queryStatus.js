const QueryStatus = {
    success: 'OK',
    created: 'CREATED',
    notFound: 'NOT_FOUND',
    badRequest: 'BAD_REQUEST',
    internalServerError: 'ERROR'
  };

  const QueryCodes = {
    success: 200,
    createdCode: 201,
    notFound: 404,
    badRequest: 400,
    internalServerError: 500
  };
  
  const success = (message) => ({ status: QueryStatus.success, message, code: QueryCodes.success });
  const created = (message)  => ({ status: QueryStatus.created, message, code: QueryCodes.createdCode});
  const notFound = (message) => ({ status: QueryStatus.notFound, message, code: QueryCodes.notFound });
  const badRequest = (message) => ({status:QueryStatus.badRequest, message, code: QueryCodes.badRequest})
  const internalServerError = (message) => ({ status: QueryStatus.internalServerError, message, code: QueryCodes.internalServerError });
  
  module.exports = {
    success,
    created,
    notFound,
    badRequest,
    internalServerError
  };