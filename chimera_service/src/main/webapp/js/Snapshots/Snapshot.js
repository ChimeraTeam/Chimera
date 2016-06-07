/**
 * Created by Yurii on 21.02.2016.
 */

var Snapshot = function (name, particles, opacity, pointSize, isUserCreated) {
    var dateTime = new DateTime();

    this.particles = particles;
    this.name = name;
    this.dateTime = dateTime.getCurrentTimeString();
    this.isUserCreated = isUserCreated;
    this.opacity = opacity;
    this.pointSize = pointSize;
}