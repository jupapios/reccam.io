# [reccam.io](reccam.io) source code [![CircleCI Build][circleci-image]][circleci-url]

[getUserMedia][getusermedia-url] and [MediaRecorder][mediarecorder-url] experiment

![screenshot-image]

## Development

### Requirments

- [nodenv](https://github.com/nodenv/nodenv#installation)
- [yarn](https://yarnpkg.com/en/docs/install)
- [bundler](https://bundler.io/#getting-started)

### Setup

#### 1. Clone the repo

```bash
git clone https://github.com/gotik/reccam.io.git
cd reccam.io
```

#### 2. Install dependencies

```bash
nodenv install
yarn install
bundle install
```

#### 3. Run it!

```bash
compass watch
yarn start
```

### Running Tests

```
yarn test
```

[circleci-url]: https://circleci.com/gh/gotik/reccam.io
[circleci-image]: https://circleci.com/gh/gotik/reccam.io.svg?style=shield
[getusermedia-url]: https://www.w3.org/TR/mediacapture-streams
[mediarecorder-url]: https://www.w3.org/TR/mediastream-recording
[screenshot-image]: https://cloud.githubusercontent.com/assets/762112/18857915/65ffb8b6-842d-11e6-8339-0197a037b9e7.png
