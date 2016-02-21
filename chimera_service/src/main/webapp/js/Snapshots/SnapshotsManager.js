/**
 * Created by Yurii on 13.02.2016.
 */

var SnapshotsManager = function () {

    /*n(rows) x 3(columns) array
    * 1 - snapshot name
    * 2 - snapshot data
    * 3 - flag (true - user snapshot)*/
    var snapshots = [];

    this.takeSnapshot = function (name, particles, isUserCreate) {
        var snapshotInfo = search(name);

        if (snapshotInfo.isExist) {
            if (!isUserCreate) {
                var index = snapshotInfo.index;
                snapshots[index][1] = new Snapshot(particles);
                return true;
            }
            else {
                return false;
            }
        }

        snapshots.push([name, new Snapshot(particles), isUserCreate]);
        return true;
    }

    this.getSnapshot = function (snapshotName) {
        var snapshotInfo = search(snapshotName);

        if (snapshotInfo.isExist) {
            return snapshots[snapshotInfo.index][1];
        }

        return null;
    }

    this.clear = function (isNeedClearNotUserSnapshots) {
        if (isNeedClearNotUserSnapshots) {
            snapshots.clear();
        }
    }

    function search(name) {
        for (var i = 0; i < snapshots.length; i++){
            if (snapshots[i][0] == name)
                return {
                    isExist: true,
                    index: i
                }
        }

        return {
            isExist: false,
            index: -1
        }
    }

    this.getUserSnapshots = function () {
        var userSnapshots = [];

        for (var i = 0; i < snapshots.length; i++){
            var current = snapshots[i];
            if (current[2]) {
                userSnapshots.push([current[0], current[1]]);
            }
        }

        return userSnapshots;
    }

    this.getNotUserSnapshots = function () {
        var notUserSnapshots = [];

        for (var i = 0; i < snapshots.length; i++){
            var current = snapshots[i];
            if (!current[2]) {
                notUserSnapshots.push([current[0], current[1]]);
            }
        }

        return notUserSnapshots;
    }
};
