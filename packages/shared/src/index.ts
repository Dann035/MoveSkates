/**
 * Contrato compartido entre `web` y `api`: la forma de las respuestas de la API.
 *
 * Es la fuente única de verdad del formato `{ data }`. Los tipos de DOMINIO
 * (Producto, etc.) los define landa y se añaden aquí cuando existan.
 */

/** Respuesta de un solo elemento. */
export interface ApiItemResponse<T> {
  data: T;
}

/** Metadatos de paginación de una lista. */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Respuesta de lista, con paginación opcional. */
export interface ApiListResponse<T> {
  data: T[];
  meta?: PaginationMeta;
}

/** Respuesta de error estándar. */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
