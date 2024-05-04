/**
 * Parse and create an error response
 * @param error - An error object
 * @param statusCode - An error status code
 * @param statusMesaage - An error status message
 */
export function createErrorResponse(
  error: any,
  statusCode: number = 422,
  statusMesaage: string = 'Bad Request',
) {
  return createError({
    statusCode,
    statusText: statusMesaage,
    data: error,
  })
}
