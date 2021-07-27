<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png" alt="microlink cdn">
  <br>
  <br>
</div>

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

> High resilient & reliable URLs processing queue.

## Motivation

When you are consuming an API (such as [Microlink API](https://docs.microlink.io/api/#introduction) or using any other API) you need to assume it can be a wide resource and some of them can eventually fail for many and varied reasons: rate limit, timeout, proxy rotation, etc.

Some of these errors can regret simply retrying the original request after waiting a prudent period of time

In any case, you want to have the guaranteed the URL will be successfully processed in an indeterministic moment in the future.

This package presents a small but powerful architecture for processing URLs with guarantees.

## Architecture

For getting guarantees that your requests are successfully processed, we are going to use [bull](https://github.com/OptimalBits/bull), a lightweight FIFO queue backed on redis.

The requests (called **jobs**) will remain in the queue until a consumer get it and verify is has been successfully processed.

## Sender

> npm run start:sender

The sender is is who sends the work to process the consumers.

It's exposed using a HTTP server.

For sending a job into the queue, just send it using a `GET`

```bash
$ curl curl http://localhost:3000\?url\=http://microlink.com\&video
```

If the job has been added successfully, you will have a `201 Created` and the `job.id` back.

```bash
HTTP/1.1 201 Created
{
  "id": "7"
}
```

You can provide two customizable things as query parameters:

- **priority** (optional): Priority value. ranges from 1 (highest priority) to [MAX_INT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) (lowest priority).
- **delay** (optional): An amount of miliseconds to wait until this job can be processed.

Any other query parameter provided will be passed as part of the job.

## Receiver

> npm run start:receiver

The receivers will process the job pushed by the consumer. 

They are a pool of processes, waiting on idle until they have something to consume.

```
$ npm run start:receiver

receiver=0 status=listening
receiver=1 status=listening
receiver=2 status=listening
receiver=3 status=listening
status=processing id=13
receiver=0 status=processed id=13 status=success
```

by default, You are going to have one receiver per physical CPU core. Since we delegated on [farm](https://github.com/Kikobeats/farm-cli#farm-cli), this is easily customizable.

## License

**queue** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/queue/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/queue/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
