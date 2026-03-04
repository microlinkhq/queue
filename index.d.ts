import Bull from 'bull'

export interface QueueJob {
  id: string
  data: QueueJobData
}

export interface QueueJobData {
  url: string
  [key: string]: any
}

export interface QueueOptions {
  priority?: number
  delay?: number
  attempts?: number
  backoff?: number | { type: string; delay: number }
  lifo?: boolean
  timeout?: number
  removeOnComplete?: boolean | number
  removeOnFail?: boolean | number
}

export interface QueueAddOptions {
  priority?: number
  delay?: number
  attempts?: number
  backoff?: number | { type: string; delay: number }
  lifo?: number
  timeout?: number
}

export interface QueueJobResult {
  id: string
  url: string
  status: 'success' | 'error' | string
}

declare const queue: Bull.Queue<QueueJobData, QueueJobResult>

export default queue
