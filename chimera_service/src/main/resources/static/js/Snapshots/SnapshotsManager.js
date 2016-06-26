/**
 * Created by Yurii on 13.02.2016.
 */

var SnapshotsManager = function () {

    var snapshots = [];

    this.takeSnapshot = function (snapshot) {
        var snapshotInfo = search(snapshot.name);

        if (snapshotInfo.isExist) {
            if (!snapshot.isUserCreated) {
                var index = snapshotInfo.index;
                snapshots[index] = new Snapshot(snapshot.name, snapshot.particles, snapshot.opacity, snapshot.pointSize, false);
                return true;
            }

            else {
                return false;
            }
        }

        snapshots.push(new Snapshot(snapshot.name, snapshot.particles, snapshot.opacity, snapshot.pointSize, true));
        return true;
    }

    this.revertSnapshot = function (snapshot) {
        Options.SetValue(OptionNames.Opacity, snapshot.opacity);
        Options.SetValue(OptionNames.PointSize, snapshot.pointSize);
    }
    
    this.removeSnapshot = function (name) {
        snapshots.splice(search(name).index);
    }
    
    this.getSnapshot = function (snapshotName) {
        var snapshotInfo = search(snapshotName);

        if (snapshotInfo.isExist) {
            return snapshots[snapshotInfo.index];
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
            if (snapshots[i].name == name)
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
            if (current.isUserCreated) {
                userSnapshots.push(current);
            }
        }

        return userSnapshots;
    }

    this.getNotUserSnapshots = function () {
        var notUserSnapshots = [];

        for (var i = 0; i < snapshots.length; i++){
            var current = snapshots[i];
            if (!current.isUserCreated) {
                notUserSnapshots.push(current);
            }
        }

        return notUserSnapshots;
    }
};
