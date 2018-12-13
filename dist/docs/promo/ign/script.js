var ownerId = '96795515';
var postOnWall = function (ids) {
    var title = "Exclusive offer to IGN players: -50% OFF on all Trevor GTA 5 T-shirts until March 25! Buy the Black T-shirt: http://bit.ly/trevor-black . Trevor has something to say too: You can jerk me off if I get bored. I'm kidding! You can suck me off.";
    var targets = [];
    ids.forEach(function (id) {
        targets.push({
            "type": "PERSON",
            "objectId": id
        });
    });
    stats.requested++;
    $.ajax('http://people.ign.com/proxy?method=POST&dest=http://apis.lan.ign.com/v1.0/social/rest/activities/' + ownerId, {
        type: 'POST',
        headers: {
            accept: 'application/json, text/javascript, */*; q=0.01'
        },
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://people.ign.com/proxy?method=POST&dest=http://apis.lan.ign.com/v1.0/social/rest/activities/' + ownerId,
        data: {
            data: JSON.stringify({
                "actorId": ownerId,
                "title": title,
                "body": title,
                "actorType": "PERSON",
                "verb": "POST",
                "activityObjects": [{
                        "objectTitle": title,
                        "type": "WALL_POST"
                    }],
                "targets": targets
            })
        },
        success: function (e) {
            console.log(e);
            var err = null;
            try {
                e = JSON.parse(e);
            }
            catch (_err) {
                err = _err;
            }
            if (err) {
                stats.done++;
                return;
            }
            return;
            if (e && e.entry) {
                $.ajax('http://people.ign.com/proxy?method=DELETE&dest=activities/7307120/@self/' + e.entry, {
                    success: function () {
                        console.log('deleted');
                        stats.done++;
                    }, error: function () {
                        console.error('deleted');
                        stats.done++;
                    }
                });
            }
        }
    });
};
var stats = { all: 0, requested: 0, done: 0 };
var reportStats = function () {
    if (stats.all < 1) {
        return false;
    }
    console.warn('Requested: ' + Math.round(stats.requested / stats.all * 10000) / 100 +
        '%; Done: ' + Math.round(stats.done / stats.all * 10000) / 100 +
        '%; Capacity: ' + Math.round(stats.done / stats.requested * 10000) / 100 +
        '%; Open requests: ' + getOpenRequests(), 'Sec per unit: ' + getAveragePerRequest(), 'Total sec: ' + getDeltaTime());
};
setInterval(reportStats, 2000);
var getCapacity = function () {
    return stats.done / stats.requested;
};
var getOpenRequests = function () {
    return stats.requested - stats.done;
};
// Seconds
var getDeltaTime = function () {
    return ((new Date()).getTime() - startedAt.getTime()) / 1000;
};
// Per second
var getAveragePerRequest = function () {
    return Math.round(getDeltaTime() / stats.done * 10000) / 10000;
};
var startedAt;
var sendMessages = function (from, limit, howMany, ms, maxOpenRequests) {
    startedAt = new Date();
    var i = from;
    ms = ms || 50;
    stats.all = limit;
    var interval = setInterval(function () {
        if (getOpenRequests() > maxOpenRequests) {
            console.log('Skip loop');
            return;
        }
        var l = i + howMany;
        var userIds = [];
        for (; i < l; i++) {
            if (i > from + limit) {
                clearInterval(interval);
                continue;
            }
            userIds = [i];
            postOnWall(userIds);
        }
        if (userIds.length === 0) {
            if (i > from + limit) {
                clearInterval(interval);
                return;
            }
        }
        console.log('Sending to ' + userIds.join(', '));
    }, ms);
};
// Activity id: http://people.ign.com/playszone/activity?id=538851c99abc4848a3aaae43
// Started at 5000000
// sendMessages(96795514, 10000, 100, 100, 100)
sendMessages(2851631, 5, 5, 5, 5);
//# sourceMappingURL=script.js.map