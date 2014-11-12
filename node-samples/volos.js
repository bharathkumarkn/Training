var express = require('express');
var request = require('request');
var async = require('async');

var quota = require('volos-quota-memory').create({
    timeUnit: 'minute',
    interval: 1,
    allow: 10
});

var cache = require('volos-cache-memory').create('demo', {
    ttl: 2000
});

var app = express();

var counter = 0;

app.get("/cache", cache.connectMiddleware().cache(), function(req, res) {
    console.log('Cache counter: %s', counter);
    res.json({
        count: counter++
    });
});

app.get("/quota", quota.connectMiddleware().apply({
    identifier: 'demo',
    weight: 1
}), function(req, res) {
    var currentQuotaCount = quota.connectMiddleware().quota.quota.buckets.demo.count;
    console.log('Quota counter: %s', currentQuotaCount);
    console.log('Hit counter: %s', counter);
    res.json({
        hitCounter: counter++,
        quota: currentQuotaCount
    });
});

app.listen('8000', function(req, res) {
    console.log("Server initialized on port 8000");
});