# homemoney-alert
Use homemoney.ua public API to remind about expenses for current month by twitter DM

# Setup

You will need to create a twitter account and an app. Then fill `config` file.
```
cp config.json.template config.json
```

# Run

```
npm start
```

# Autorun

To edit crontab execute
```
crontab -e
```

Add following lines
```
# run command at 11AM every Sunday, Wednesday and Friday
0 11 * * 0,3,5 (cd ./path/to/project/dir && npm install && npm start)
```