Today I decided I want to increase my experience with testing, and the first step for me was integrating [CodeCov](https://codecov.io) so I can get a better overview of what's covered and what's not. 

I got up and running on CodeCov by setting up Github Actions to submit the report. Luckily, codecov already has deployed a Github Action ![here](https://github.com/codecov/codecov-action).

To create our code coverage, we need to first grab our CodeCoverage Token. You'll need to add that into Secret's in your repository Setting's panel.

Afterwards, we create a new workflow called `.github/workflows/codecov.yaml`, that looks like this:

```yaml
name: Code Coverage
on: [push]

jobs:
  build:
    name: Run Code Coverage
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: codecov/codecov-action@v1
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

That's it! Now every time someone pushes on your repository Code Cov will upload a new report