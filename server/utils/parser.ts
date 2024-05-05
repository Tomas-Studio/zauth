import type { H3Event, HTTPHeaderName } from 'h3'
import { z } from 'zod'

type ParsedData<T extends z.ZodTypeAny | z.ZodRawShape> = T extends z.ZodTypeAny
  ? z.output<T>
  : T extends z.ZodRawShape
    ? z.output<z.ZodObject<T>>
    : never

type SafeParsedData<T extends z.ZodTypeAny | z.ZodRawShape> = T extends z.ZodTypeAny
  ? z.SafeParseReturnType<T, ParsedData<T>>
  : T extends z.ZodRawShape
    ? z.SafeParseReturnType<z.ZodObject<T>, ParsedData<T>>
    : never

export type ParseOptions = Partial<z.ParseParams>

/**
 * Parse and validate request query from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function parseQueryAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const query = getQuery(event)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    return await finalSchema.parseAsync(query, parseOptions)
  }
  catch (error) {
    throw createErrorResponse(error)
  }
}

/**
 * Parse and validate request body from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function parseBodyAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const body = await readBody(event)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    return await finalSchema.parseAsync(body, parseOptions)
  }
  catch (error) {
    throw createErrorResponse(error)
  }
}

/**
 * Parse and validate params from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function parseParamsAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  event: H3Event,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const params = getRouterParams(event)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    return await finalSchema.parseAsync(params, parseOptions)
  }
  catch (error) {
    throw createErrorResponse(error)
  }
}

/**
 * Parse and validate a header from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param name - A header name.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function parseHeaderAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  event: H3Event,
  name: HTTPHeaderName,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const header = getHeader(event, name)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    return await finalSchema.parseAsync(header, parseOptions)
  }
  catch (error) {
    throw createErrorResponse(error, 422, 'Header parsing failed')
  }
}

/**
 * Parse and validate a cookie from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param key - A cookie key.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function parseCookieAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  event: H3Event,
  key: string,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const cookie = getCookie(event, key)
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    return await finalSchema.parseAsync(cookie, parseOptions)
  }
  catch (error) {
    throw createErrorResponse(error, 401, 'Unauthorized')
  }
}

/**
 * Parse and validate a cookie from event handler. Doesn't error if validation fails.
 * @param event - A H3 event object.
 * @param key - A cookie key.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function safeParseCookieAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  event: H3Event,
  key: string,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<SafeParsedData<T>> {
  const cookie = getCookie(event, key)
  const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
  return finalSchema.safeParseAsync(cookie, parseOptions) as Promise<SafeParsedData<T>>
}

/**
 * Parse data OR promise with a schema. Throws an error is validation fails
 * @param dataOrPromise - data object.
 * @param schema - A Zod object shape or object schema to validate.
 */
export async function parseDataAs<T extends z.ZodTypeAny | z.ZodRawShape>(
  dataOrPromise: any,
  schema: T,
  parseOptions?: ParseOptions,
): Promise<ParsedData<T>> {
  try {
    const data = await dataOrPromise
    const finalSchema = schema instanceof z.ZodType ? schema : z.object(schema)
    return await finalSchema.parseAsync(data, parseOptions)
  }
  catch (error) {
    throw createErrorResponse(error, 422, 'Data parsing failed')
  }
}

export { z }
